import type { FormSpec } from './form_control';
import type { FormGroup } from './form_group';

export function createFormGroup<T extends FormSpec<any, any>>(controllers: T): FormGroup<T> {
  return {
    controllers,
    refs: {},
    isValid() {
      // noop
    },
    state(): { [key in keyof T]: string } {
      const builder: { [key: string]: any } = {};

      Object.entries(this.controllers).forEach(([key, value]) => {
        builder[key] = value.value;
      });

      return builder as { [key in keyof T]: string };
    },
    reset() {
      // noop
    },
  };
}
