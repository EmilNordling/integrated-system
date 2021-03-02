import { Instantiation, Presentation, Scoped } from 'one-atom';
import { SpacesApiService } from '../api/spaces_api.service';
import type { SpaceApiModel } from '../api/models/space_api_model';
import type { AppModel } from './app.controller';

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
Instantiation.__registerMetaData(AppsController, [SpacesApiService]);
