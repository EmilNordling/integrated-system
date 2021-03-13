/* eslint-disable @typescript-eslint/ban-types */
import './_debug_hook';
import { useEffect, useState } from 'react';
import { ConcurrentPresentation, FlowPresentation, SynchronousPresentation, CurrPresentationTuple } from './subscribable/mod';

export function usePresentation<T extends object>(state: FlowPresentation<T>, deps?: ReadonlyArray<keyof T>): CurrPresentationTuple<T>;
export function usePresentation<T extends object>(state: ConcurrentPresentation<T>, deps?: ReadonlyArray<keyof T>): Readonly<T>;
export function usePresentation<T extends object>(state: SynchronousPresentation<T>, deps?: ReadonlyArray<keyof T>): Readonly<T>;
export function usePresentation<T extends object>(
  state: SynchronousPresentation<T> | ConcurrentPresentation<T> | FlowPresentation<T>,
  triggers?: ReadonlyArray<keyof T>,
): CurrPresentationTuple<T> | Readonly<T> {
  const [, forceUpdate] = useState([]);

  useEffect(() => {
    (globalThis as any)['__debug_hook__'].emit('add', state);

    const disposer = state.subscribe((changeSet) => {
      if (triggers && changeSet) {
        const shouldUpdate = triggers.find((trigger) => {
          return changeSet.has(trigger);
        });

        if (shouldUpdate) {
          forceUpdate([]);
        }

        return;
      }

      forceUpdate([]);
    });

    return () => {
      (globalThis as any)['__debug_hook__'].emit('remove', state);
      disposer();
    };
  }, [state, triggers]);

  return state.read();
}
