export type Disposer = () => void;

export type HookFn<T> = (changeSet?: Set<keyof T>) => void;

export interface Subscribable<T extends object | Record<any, any>> {
  subscribe(event: HookFn<T>): Disposer;
}
