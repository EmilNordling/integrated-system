import { resolve } from '@modules/rdi/resolve';
import { mockResponse } from '../services/http.service/mock_response';
import { SpacesApiService } from './spaces_api.service';

// This file is named tet due to esm incompatibility

test('asserts that service is resolved', () => {
  const spacesApiService = resolve(SpacesApiService);

  expect(spacesApiService).toBeInstanceOf(SpacesApiService);
});

test('asserts that getAll returns mocked data', async () => {
  const spacesApiService = resolve(SpacesApiService);
  const expectedResult = 'worked';

  mockResponse('/spaces', expectedResult);

  const response = await spacesApiService.getAll();
  expect(response).toBe(expectedResult);
});

test('asserts that getUnwrappedDataFor returns mocked data', async () => {
  const spacesApiService = resolve(SpacesApiService);
  const expectedResult = 'worked';

  mockResponse('/spaces/here', expectedResult);

  const response = await spacesApiService.getUnwrappedDataFor('here');
  expect(response).toBe(expectedResult);
});
