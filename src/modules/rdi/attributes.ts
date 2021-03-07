import { register } from './_register';
import { Ctor, GenericClassDecorator, Lifetimes } from './_common';

/**
 * Registers a class as a service with a Singleton lifetime.
 */
export function Singleton(): GenericClassDecorator<Ctor<any>> {
  return <T>(ctor: Ctor<T>) =>
    register(ctor, {
      lifeTimes: Lifetimes.Singleton,
    });
}

/**
 * Registers a class as a service with a Transient lifetime.
 */
export function Transient(): GenericClassDecorator<Ctor<any>> {
  return <T>(ctor: Ctor<T>) =>
    register(ctor, {
      lifeTimes: Lifetimes.Transient,
    });
}

/**
 * Registers a class as a service with a Scoped lifetime.
 */
export function Scoped(): GenericClassDecorator<Ctor<any>> {
  return <T>(ctor: Ctor<T>) =>
    register(ctor, {
      lifeTimes: Lifetimes.Scoped,
    });
}
