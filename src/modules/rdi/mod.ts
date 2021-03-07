import { resolve } from './resolve/mod';
import { register } from './register';

export * from './attributes';

export const RDI = Object.freeze({
  resolve,
  register,
});
