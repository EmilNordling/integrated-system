import { Singleton } from '@modules/rdi/mod';
import {
  BrowserHistory,
  BrowserHistoryOptions,
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory,
  HashHistory,
  HashHistoryOptions,
  MemoryHistory,
  MemoryHistoryOptions,
  State,
} from 'history';
import { resolvePath } from 'react-router';

interface NavigateOption {
  replace?: boolean;
  state?: State;
}

export class HistoryNotSetError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = 'HistoryNotSetError';
    Object.setPrototypeOf(this, HistoryNotSetError.prototype);
  }
}

@Singleton()
export class RouterService {
  private internalHistory: BrowserHistory | MemoryHistory | HashHistory | null = null;
  private get history(): BrowserHistory | MemoryHistory | HashHistory {
    if (!this.internalHistory) {
      throw new HistoryNotSetError('History is null, initialize one by calling the `createBrowserHistory` method');
    }

    return this.internalHistory;
  }

  constructor() {
    // Empty
  }

  // Text copied from https://github.com/ReactTraining/history/blob/master/packages/history/index.ts#L390
  /**
   * Browser history stores the location in regular URLs. This is the standard for
   * most web apps, but it requires some configuration on the server to ensure you
   * serve the same app at multiple URLs.
   */
  public createBrowserHistory(options?: BrowserHistoryOptions): BrowserHistory {
    this.internalHistory = createBrowserHistory(options);

    return this.internalHistory;
  }

  // Text copied from https://github.com/ReactTraining/history/blob/master/packages/history/index.ts#L390
  /**
   * Hash history stores the location in window.location.hash. This makes it ideal
   * for situations where you don't want to send the location to the server for
   * some reason, either because you do cannot configure it or the URL space is
   * reserved for something else.
   */
  public createHashHistory(options?: HashHistoryOptions): HashHistory {
    this.internalHistory = createHashHistory(options);

    return this.internalHistory;
  }

  // Text copied from https://github.com/ReactTraining/history/blob/master/packages/history/index.ts#L877
  /**
   * Memory history stores the current location in memory. It is designed for use
   * in stateful non-browser environments like tests and React Native.
   */
  public createMemoryHistory(options?: MemoryHistoryOptions): MemoryHistory {
    this.internalHistory = createMemoryHistory(options);

    return this.internalHistory as MemoryHistory;
  }

  /**
   * Navigates to a view using an relative route path.
   */
  public navigate(to: string | number, options: NavigateOption = {}): void {
    // Implements https://github.com/ReactTraining/react-router/blob/dev/packages/react-router/index.tsx#L420
    if (typeof to === 'number') {
      this.history.go(to);

      return;
    }

    const path = resolvePath(to, this.internalHistory?.location.pathname);

    if (options.replace) {
      this.history.replace(path, options.state);

      return;
    }

    this.history.push(path, options.state);
  }
}
