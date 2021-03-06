export type Ctor<T> = {
  new (...args: any[]): T;
};

export type Token<T = any> = Ctor<T> | symbol;

export enum Lifetimes {
  Singleton,
  Transient,
  Scoped,
}

export type GenericClassDecorator<T> = (target: T) => void;
