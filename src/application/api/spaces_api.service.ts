import { HttpService } from '../services/http.service/mod';
import { ApiControllerBase } from './_api_controller_base';
import { Singleton } from '@modules/rdi/attributes';
import type { SpacesApiModel } from './models/spaces_api_model';
import type { SpaceUnwrappedApiModel } from './models/space_unwrapped_api_model';
import type { SpaceDynamicApiModel } from './models/space_dynamic_api_model';
import { __sprinkelMetaData } from '@modules/rdi/meta';

@Singleton()
export class SpacesApiService extends ApiControllerBase {
  constructor(private readonly httpService: HttpService) {
    super('spaces');
  }

  public async getAll(): Promise<SpacesApiModel> {
    const url = this.controller;

    const { default: data } = await import('./mocks/spaces_api_model.mock');
    return this.httpService.mock().get(url, data);

    return this.httpService.get(url);
  }

  public async getUnwrappedDataFor(id: string): Promise<SpaceUnwrappedApiModel> {
    const url = `${this.controller}/${id}`;

    const { default: data } = await import('./mocks/space_unwrapped_api_model.mock');
    return this.httpService.mock().get(url, data);

    return this.httpService.get(url);
  }

  public async getDynamicDataFor(id: string): Promise<SpaceDynamicApiModel> {
    const url = `${this.controller}/${id}`;

    const { default: data } = await import('./mocks/space_dynamic_api_model.mock');
    return this.httpService.mock().get(url, data);

    return this.httpService.get(url);
  }
}
// A vite plugin will be added later
__sprinkelMetaData(SpacesApiService, [HttpService]);
