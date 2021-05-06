import { Singleton } from '@modules/rdi/attributes';
import { __sprinkelMetaData } from '@modules/rdi/meta';
import { ViewsController } from './views.controller';

@Singleton()
export class UiBindingsController {
  constructor(public readonly views: ViewsController) {
    // Empty
  }
}
__sprinkelMetaData(UiBindingsController, [ViewsController]);
