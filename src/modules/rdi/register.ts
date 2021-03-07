import { registeredServices, Registration } from './_registration';
import { Ctor, Lifetimes } from './_common';

interface ReplaceWith<T> {
  useClass?: Ctor<Partial<T>>;
  lifeTimes?: Lifetimes;
}

/**
 * Register a class to be used as a service. If the replace parameter is
 * passed it'll override any previously registered service (works for any lifetime).
 */
export function register<T>(service: Ctor<T>, replace?: ReplaceWith<T>): void {
  const registeredService = registeredServices.get(service);

  if (replace?.useClass) {
    registeredServices.set(
      service,
      new Registration(service, replace.useClass, { lifeTime: replace.lifeTimes ?? Lifetimes.Singleton }),
    );

    return;
  }

  if (registeredService == null) {
    registeredServices.set(service, new Registration(service, service, { lifeTime: replace?.lifeTimes ?? Lifetimes.Singleton }));
  }
}

/**
 * Retrieves the Registration instance for given registered service.
 */
export function getRegisteredService<T>(service: Ctor<T>): Registration<T> | null {
  const reg = registeredServices.get(service);

  return reg ?? null;
}
