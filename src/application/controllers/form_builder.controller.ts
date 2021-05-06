import { SpaceDynamicApiModel } from '@api/models/space_dynamic_api_model';
import { SpacesApiService } from '@api/spaces_api.service';
import { Scoped } from '@modules/rdi/mod';
import { __sprinkelMetaData } from '@modules/rdi/meta';
import { Presentation } from '@modules/presentation/mod';

@Scoped()
export class FormBuilderController {
  public readonly presentation = Presentation.createConcurrent<SpaceDynamicApiModel>();

  constructor(private readonly spacesApiService: SpacesApiService) {
    // Empty
  }

  public connect(id: string): void {
    this.presentation.suspend(this.spacesApiService.getDynamicDataFor(id));
  }
}
// A vite plugin will be added later
__sprinkelMetaData(FormBuilderController, [SpacesApiService]);
