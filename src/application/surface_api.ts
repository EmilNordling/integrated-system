import { UiBindingsController } from '@controllers/ui_bindings.controller/mod';
import { RDI } from '@modules/rdi/mod';

export const SurfaceApi = Object.freeze({
  apiVersion: '0.0.0',
  ui: RDI.resolve(UiBindingsController),
});
