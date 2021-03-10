import { resolve } from './resolve/mod';
import { register } from './register';

export * from './attributes';
export * from './meta';
export * from './flush';
export * from './use_service';

export const RDI = Object.freeze({
  resolve,
  register,
});
