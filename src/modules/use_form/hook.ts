import { useState, useEffect } from 'react';
import { createFormGroup } from './create_form_group';
import type { FormSpec } from './form_control';
import type { FormGroup } from './form_group';
import type { FormElementLike } from './_common';

// @ts-ignore
// type FormSubmitData<T extends FormPrimitiveValue, K extends FormSpec<K, T>> = {
//   [key in keyof K]: Extract<FormPrimitiveValue, K[key]['value']>;
// };

type FormEquals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

const formStates = new WeakMap<FormSpec<any, any>, FormGroup<any>>();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function hook<T extends FormSpec<any, any>>(control: () => T) {
  const [formState] = useState<T>(control);

  let formGroup = formStates.get(formState) as FormGroup<T>;
  if (formGroup == null) {
    formGroup = createFormGroup(formState);
    formStates.set(formState, formGroup);
  }

  function handleInputChange(event: HTMLElementEventMap[keyof HTMLElementEventMap]): void {
    if (!(event && event.target)) return;

    const { value, name } = event.target as HTMLInputElement;

    formState[name].value = value;
  }

  /** Binds an input to this hook. */
  function set<K extends HTMLInputElement>(
    ref: FormElementLike<FormEquals<K['name'], keyof T> extends true ? K['name'] : string> | null,
  ): void {
    if (ref) {
      if (typeof formState[ref.name] == null) {
        throw new Error(`ref needs the name attribute to be set`);
      }

      ref.value = formState[ref.name].value;

      if (!formGroup.refs[ref.name]) {
        ref.addEventListener('input', handleInputChange);

        formGroup.refs[ref.name] = ref;
      }
    }
  }

  /** Wrapper for the a submit callback. */
  const forward = (callback: (data: { [key in keyof T]: T[key]['value'] }) => void) => (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.persist();

    callback(formGroup.state());
  };

  useEffect(() => {
    return () => {
      Object.values(formGroup.refs).forEach((ref) => {
        ref.removeEventListener('input', handleInputChange);
      });
    };
  }, []);

  return {
    set,
    forward,
    formGroup,
  };
}
