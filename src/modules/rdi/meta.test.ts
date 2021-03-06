import { Singleton } from './attributes';
import { __setCustomLookUp } from './meta';
import { resolve } from './resolve';

// Have this at the bottom since there's not reset of __setCustomLookUp
xit('emitDecoratorMetadata should work', () => {
  // @ts-ignore
  require('reflect-metadata');

  __setCustomLookUp((token) => {
    // @ts-ignore
    return Reflect.getMetadata('design:paramtypes', token) ?? [];
  });

  @Singleton()
  class A {
    public data = 'og';
  }

  @Singleton()
  class B {
    public data = 'og';

    constructor(public readonly a: A) {}
  }

  const b = resolve(B);

  expect(b.a).toBeInstanceOf(A);
});
