import type { FormPrimitiveValue } from './_common';

export type FormValidator = (value: FormPrimitiveValue) => boolean;
export interface FormControl<T extends FormPrimitiveValue> {
  initialValue: T;
  value: T;
  valid: boolean;
  touched: boolean;
  validators: FormValidator[];
}
export type FormSpec<T, K extends FormPrimitiveValue> = {
  [key in keyof T]: FormControl<K>;
};

export function formControl<T extends FormPrimitiveValue>(defaultValue: T, ...validators: FormValidator[]): FormControl<T> {
  return {
    initialValue: defaultValue,
    value: defaultValue,
    valid: false,
    touched: false,
    validators: [...validators],
  };
}
