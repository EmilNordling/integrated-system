import { Singleton } from './attributes';
import { resolve } from './resolve/mod';
import { flushAll } from './flush';
import { register } from './register';

it('should not use same singleton instances after a flush', () => {
  @Singleton()
  class A {
    public data = {
      nbr: 1,
    };
  }

  {
    const a = resolve(A);
    expect(a.data.nbr).toBe(1);
    a.data.nbr++;
  }

  {
    const a = resolve(A);
    expect(a.data.nbr).toBe(2);
  }

  {
    flushAll();
    expect(() => resolve(A)).toThrow();
    register(A, { useClass: A });
    const a = resolve(A);
    expect(a.data.nbr).toBe(1);
  }
});
