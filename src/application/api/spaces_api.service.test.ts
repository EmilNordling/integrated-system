import { Instantiation } from 'one-atom';
import { mockResponse } from '../http.service/mock_response';
import { SpacesApiService } from './spaces_api.service';

test('asserts that service is resolved', () => {
  const spacesApiService = Instantiation.resolve(SpacesApiService);

  expect(spacesApiService).toBeInstanceOf(SpacesApiService);
});

test('asserts that getAll returns mocked data', async () => {
  const spacesApiService = Instantiation.resolve(SpacesApiService);
  const expectedResult = 'worked';

  mockResponse('/spaces', expectedResult);

  const response = await spacesApiService.getAll();
  expect(response).toBe(expectedResult);
});

test('asserts that getUnwrappedDataFor returns mocked data', async () => {
  const spacesApiService = Instantiation.resolve(SpacesApiService);
  const expectedResult = 'worked';

  mockResponse('/spaces/here', expectedResult);

  const response = await spacesApiService.getUnwrappedDataFor('here');
  expect(response).toBe(expectedResult);
});
