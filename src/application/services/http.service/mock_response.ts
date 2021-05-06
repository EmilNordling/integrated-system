/** # Don't reference this variable */
export const __mockedResponseData: Record<string, unknown> = Object.create(null);

export function mockResponse(key: string, data: unknown): void {
  if (__mockedResponseData[key]) {
    throw new Error(`previous "${key}" has never been exhausted, your tests may be faulty if this happen`);
  }

  __mockedResponseData[key] = data;
}
