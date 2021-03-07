export type Disposer = () => void;
type GetArgumentTypes<T> = T extends (...x: infer argumentsType) => any ? argumentsType : never;
type AnyFunction = (args?: any) => any;

export class Timer {
  private disposers = new Map<number, Disposer>();
  private registeredId = 0;

  public static wait(...args: GetArgumentTypes<Timer['wait']>): Disposer {
    const time = new Timer();
    time.wait(...args);

    return time.flush.bind(time);
  }

  public static repeat(...args: GetArgumentTypes<Timer['repeat']>): Disposer {
    const time = new Timer();
    time.repeat(...args);

    return time.flush.bind(time);
  }

  public wait(callback: AnyFunction, duration: number): Disposer {
    const timeout = setTimeout(callback, duration);

    const disposer = (): void => {
      clearTimeout(timeout);
    };

    return this.registerDisposer(disposer);
  }

  public repeat(callback: AnyFunction, duration: number, callOnceOnInvoke = false): Disposer {
    if (callOnceOnInvoke) {
      callback();
    }

    const interval = setInterval(callback, duration);

    const disposer = (): void => {
      clearInterval(interval);
    };

    return this.registerDisposer(disposer);
  }

  public flush(): void {
    this.disposers.forEach((disposer) => disposer());
  }

  private registerDisposer(disposer: Disposer): Disposer {
    const localId = this.registeredId++;

    this.disposers.set(localId, disposer);

    return () => {
      this.disposers.delete(localId);

      disposer();
    };
  }
}
