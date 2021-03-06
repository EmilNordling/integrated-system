import type { AppModel } from './app.controller';
import type { SpaceApiModel } from '@api/models/space_api_model';
import { SpacesApiService } from '@api/spaces_api.service';
import { Presentation } from '@modules/presentation/mod';
import { Scoped } from '@modules/rdi/attributes';
import { __registerMetaData } from '@modules/rdi/meta';

export type AppPresentationModel = {
  apps: AppModel[];
};

@Scoped()
export class AppsController {
  public readonly presentation = Presentation.createConcurrent<AppPresentationModel>();

  constructor(private readonly spacesApiService: SpacesApiService) {
    this.presentation.suspend(this.spacesApiService.getAll(), ({ spaces }) => ({
      apps: spaces.map(this.spaceToAppModel),
    }));
  }

  private spaceToAppModel(space: SpaceApiModel): AppModel {
    return {
      id: space.id,
      name: space.name,
      selected: space.isDefault,
    };
  }
}
// A vite plugin will be added later
__registerMetaData(AppsController, [SpacesApiService]);
