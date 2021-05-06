import { useDebugValue, useMemo } from 'react';
import { resolve } from './resolve/mod';
import type { Ctor } from './_common';

interface formattedServiceForRDT {}

// eslint-disable-next-line @typescript-eslint/ban-types
function formatService<T extends Object>(service: T): formattedServiceForRDT {
  const keys = Object.getOwnPropertyNames((service as any).__proto__);

  const propertyBuilder: { [keys: string]: any } = {};
  const methodBuilder: { [keys: string]: any } = {};
  for (const key of keys) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const visitor = service[key];

    if (typeof visitor === 'function') {
      methodBuilder[key] = visitor;

      continue;
    }

    propertyBuilder[key] = visitor;
  }

  return {
    properties: propertyBuilder,
    methods: methodBuilder,
  };
}

/**
 * Returns an instance, during the process all of its dependencies will also be created.
 */
export function useService<T>(ctor: Ctor<T>): T {
  const service = useMemo(() => resolve(ctor), [ctor]);

  useDebugValue(service, formatService);

  return service;
}
