import { useState, useEffect } from 'react';
import { createFormGroup } from './create_form_group';
import type { FormSpec } from './form_control';
import type { FormGroup } from './form_group';
import type { FormElementLike } from './_common';

type FormEquals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

const formStates = new WeakMap<FormSpec<any, any>, FormGroup<any>>();

// @internal
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export function useFormInternal<T extends FormSpec<any, any>>(control: () => T) {
  const [formState] = useState<T>(control);

  let formGroup = formStates.get(formState) as FormGroup<T>;
  if (formGroup == null) {
    formGroup = createFormGroup(formState);
    formStates.set(formState, formGroup);
  }

  function handleInputChange(event: HTMLElementEventMap[keyof HTMLElementEventMap]): void {
    if (!(event && event.target)) return;

    const { value, name, type, checked } = event.target as HTMLInputElement;

    if (type === 'checkbox') {
      formState[name].value = checked;

      return;
    }

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

      if (ref.type === 'checkbox') {
        ref.checked = formState[ref.name].value;
      } else {
        ref.value = formState[ref.name].value;
      }

      if (!formGroup.refs[ref.name]) {
        ref.addEventListener('change', handleInputChange);

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
        ref.removeEventListener('change', handleInputChange);
      });
    };
  }, []);

  return {
    set,
    forward,
    formGroup,
  };
}
