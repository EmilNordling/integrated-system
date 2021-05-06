import { Lifetimes } from '../_common';
import type { Resolution } from './_resolution';

// ----------------------------- Retrieve step -----------------------------
// This step's responsibility is to check for the requested instance and
// return it.

export function retrieveStep<T>(resolution: Resolution<T>): T {
  if (resolution.contexts == null) throw new Error('steps order are wrong, expected branch -> produce -> retrieve');

  const [globalContext, scopedContext, [transientRoot, localContext]] = resolution.contexts;

  if (resolution.registration.settings.lifeTime === Lifetimes.Scoped) {
    return scopedContext.retrieve(resolution.token) as T; // Casting as T since by this point it SHOULD be in resolved_scoped_services
  }

  if (resolution.registration.settings.lifeTime === Lifetimes.Transient) {
    const resolvedTransientInstances = localContext.retrieve(transientRoot);
    if (resolvedTransientInstances === undefined) {
      throw new Error(`transient root was never created`);
    }

    return resolvedTransientInstances[0] as T; // Casting as T since by this point the index 0 SHOULD be the requested resolving_ctor instance
  }

  return globalContext.retrieve(resolution.token) as T; // Casting as T since by this point it SHOULD be in resolved_singleton_services
}
