/* eslint-disable @typescript-eslint/no-explicit-any */
import { register } from './register';
import { Ctor, GenericClassDecorator, Lifetimes } from './_common';

/**
 * Registers a class as a service with a Singleton lifetime.
 */
export function Singleton(): GenericClassDecorator<Ctor<any>> {
  return <T>(ctor: Ctor<T>) => {
    register(ctor, {
      useClass: ctor,
      lifeTimes: Lifetimes.Singleton,
      keepOldRegistration: true,
    });
  };
}

/**
 * Registers a class as a service with a Transient lifetime.
 */
export function Transient(): GenericClassDecorator<Ctor<any>> {
  return <T>(ctor: Ctor<T>) => {
    register(ctor, {
      useClass: ctor,
      lifeTimes: Lifetimes.Transient,
      keepOldRegistration: true,
    });
  };
}

/**
 * Registers a class as a service with a Scoped lifetime.
 */
export function Scoped(): GenericClassDecorator<Ctor<any>> {
  return <T>(ctor: Ctor<T>) => {
    register(ctor, {
      useClass: ctor,
      lifeTimes: Lifetimes.Scoped,
      keepOldRegistration: true,
    });
  };
}
