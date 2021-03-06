import type { Ctor, Lifetimes, Token } from './_types';

export class Registration<T> {
  constructor(
    public readonly id: Token,
    public readonly ctor: Ctor<T>,
    public readonly settings: {
      lifeTime: Lifetimes;
    },
  ) {
    // Empty
  }
}

export const registeredServices = new Map<Token, Registration<any>>();
