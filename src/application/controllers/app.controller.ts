import type { SpaceUnwrappedEntryApiModel } from '@api/models/space_unwrapped_entry_api_model';
import { SpacesApiService } from '@api/spaces_api.service';
import { Presentation } from '@modules/presentation/mod';
import { Scoped } from '@modules/rdi/attributes';
import { __registerMetaData } from '@modules/rdi/meta';

export interface AppModel {
  id: string;
  name: string;
  selected: boolean;
}

export type AppPresentationModel = {
  routes: SpaceUnwrappedEntryApiModel[];
};

@Scoped()
export class AppController {
  public readonly staticEntries: SpaceUnwrappedEntryApiModel[] = [
    {
      id: 'static_home',
      icon: 'eva_wifi_off',
      routeTo: '',
      title: 'Home',
    },
    {
      id: 'static_analytic',
      icon: 'eva_trending',
      routeTo: '/analytic',
      title: 'analytic',
    },
  ];
  public readonly presentation = Presentation.createConcurrent<AppPresentationModel>();

  constructor(private readonly spacesApiService: SpacesApiService) {
    // Empty
  }

  public connectApp(app: AppModel): void {
    this.presentation.suspend(this.spacesApiService.getUnwrappedDataFor(app.id));
  }
}
// A vite plugin will be added later
__registerMetaData(AppController, [SpacesApiService]);
