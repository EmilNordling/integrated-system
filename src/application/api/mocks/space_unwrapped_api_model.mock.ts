import type { SpaceUnwrappedApiModel } from '../models/space_unwrapped_api_model';

const spaceUnwrappedApiModelMock: SpaceUnwrappedApiModel = {
  routes: [
    {
      id: 'fddf3d07-018e-4025-954c-d34babee766c',
      icon: 'eva_wifi_off',
      routeTo: '/custom_page',
      title: 'custom page',
    },
    {
      id: '95498d41-021b-4d7a-9c2f-63f9fab0fa34',
      icon: 'eva_trending',
      routeTo: '/custom_page_2',
      title: 'custom page 2',
    },
  ],
};

export default spaceUnwrappedApiModelMock;
