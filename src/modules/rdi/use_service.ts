import { useMemo } from 'react';
import { resolve } from './resolve';
import type { Ctor } from './_types';

/**
 * Returns an instance, during the process all of its dependencies will also be created.
 */
export function useService<T>(ctor: Ctor<T>): T {
  const service = useMemo(() => resolve(ctor), [ctor]);

  return service;
}
