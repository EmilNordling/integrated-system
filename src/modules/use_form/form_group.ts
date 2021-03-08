import type { FormElementLike } from './_common';

export interface FormGroup<T> {
  refs: { [key: string]: FormElementLike<any> };
  controllers: T;
  isValid(): void;
  state(): { [key in keyof T]: string };
  reset(): void;
}
