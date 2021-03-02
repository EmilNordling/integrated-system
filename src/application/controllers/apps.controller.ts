import { Instantiation, Presentation, Scoped } from 'one-atom';
import { SpacesApiService } from '../api/spaces_api.service';
import { AppModel } from './app.controller';

export type AppPresentationModel = {
  apps: AppModel[];
};

@Scoped()
export class AppsController {
  public readonly presentation = Presentation.createConcurrent<AppPresentationModel>();

  constructor(private readonly spacesApiService: SpacesApiService) {
    this.presentation.suspend(this.spacesApiService.getAll(), ({ spaces }) => {
      const apps: AppModel[] = spaces.map((space) => {
        return {
          id: space.id,
          name: space.name,
          selected: space.isDefault,
        };
      });

      return {
        apps,
      };
    });
  }
}
// A vite plugin will be added later
Instantiation.__registerMetaData(AppsController, [SpacesApiService]);
