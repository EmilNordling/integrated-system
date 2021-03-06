import type { SpacesApiModel } from '../models/spaces_api_model';

const spacesApiModelMock: SpacesApiModel = {
  spaces: [
    {
      icon: '',
      name: 'api 1',
      iconBlurHash: '',
      id: '106114d3-6a1f-42ce-bdd0-e8c8bbd27bb2',
      isDefault: true,
      permissions: 0,
      listable: false,
    },
    {
      icon: '',
      name: 'api 2',
      iconBlurHash: '',
      id: 'fee852dd-3819-49ec-a996-2d2b849979d8',
      isDefault: false,
      permissions: 0,
      listable: false,
    },
  ],
};

export default spacesApiModelMock;
