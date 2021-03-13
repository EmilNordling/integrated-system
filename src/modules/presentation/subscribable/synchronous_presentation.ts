/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-types */
import '../_debug_hook';
import { MutationFn, FixedSizeImpl } from '../data_struct/fixed_size_impl';
import type { Disposer, HookFn, Subscribable } from './_common';

export class SynchronousPresentation<T extends object> implements Subscribable<T> {
  private readonly data: FixedSizeImpl<T>;
  private readonly hooks: Map<symbol, HookFn<T>> = new Map();

  constructor(initialState: T) {
    if ((globalThis as any)['__debug_ref__']) {
      (globalThis as any)['__debug_ref__'].add(this);
    }

    if (typeof initialState !== 'object') {
      throw new Error('a state can only be represented as an object literal');
    }

    this.data = new FixedSizeImpl(initialState);
  }

  public subscribe(event: HookFn<T>): Disposer {
    const id = Symbol();

    this.hooks.set(id, event);

    return () => {
      this.hooks.delete(id);
    };
  }

  public write(currentState: Partial<T> | MutationFn<T>): void {
    try {
      const newState = currentState instanceof Function ? currentState(this.data) : currentState;

      const changeSet = this.data.insert(newState);
      this.dispatch(changeSet);
    } catch (error) {
      console.error(`could not mutate the state:\n\n${error}`);
    }
  }

  public read(): Readonly<T> {
    return this.data.extract();
  }

  private dispatch(changeSet?: Set<keyof T>): void {
    this.hooks.forEach((hook) => hook(changeSet));
  }
}
