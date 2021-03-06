import type { Mock, HttpServiceOption } from './_http';

interface OptionSpecification<T> {
  mock?: Mock<T>;
  throttle?: number;
}

export class HttpOption<T> implements HttpServiceOption {
  public readonly throttle?: number;
  public readonly mock?: Mock<T>;
  public static defaultRequestConfig = {};

  constructor(spec?: OptionSpecification<T>) {
    this.mock = spec?.mock;
    this.throttle = spec?.throttle;

    // if (process.env.NODE_ENV !== 'production' && process.env.CUSTOM_GLOBAL_ENV?.throttle > 0 && !this.throttle) {
    if (!import.meta.env.PROD && !this.throttle) {
      // this.throttle = process.env.CUSTOM_GLOBAL_ENV.throttle;
      this.throttle = 150;
    }
  }
}
