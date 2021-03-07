import { Scoped, Singleton, Transient } from './attributes';
import { __registerMetaData } from './meta';
import { resolve } from './resolve/mod';
import { flushAll } from './_flush';
import { getRegisteredService, register } from './_register';
import { Lifetimes } from './_common';

afterEach(() => {
  flushAll();
});

test('asserts that it registers services', () => {
  @Singleton()
  class SingletonService {}

  @Scoped()
  class ScopedService {}

  @Transient()
  class TransientService {}

  const registered_singleton = getRegisteredService(SingletonService)!;
  const registered_scoped = getRegisteredService(ScopedService)!;
  const registered_transient = getRegisteredService(TransientService)!;
  const registered_null = getRegisteredService(class {});
  expect(registered_singleton.ctor).toEqual(SingletonService);
  expect(registered_scoped.ctor).toEqual(ScopedService);
  expect(registered_transient.ctor).toEqual(TransientService);
  expect(registered_null).toEqual(null);
});

test('asserts that it replace services', () => {
  @Singleton()
  class A {
    public data = 'og';
  }

  @Scoped()
  class B {
    public data = 'og';
  }

  @Transient()
  class C {
    public data = 'og';
  }

  register(A, {
    useClass: class Mock {
      public data = 'a';
    },
  });
  const a = resolve(A);
  expect(a.data).toEqual('a');

  register(B, {
    useClass: class Mock {
      public data = 'b';
    },
  });
  const b = resolve(B);
  expect(b.data).toEqual('b');

  register(C, {
    useClass: class Mock {
      public data = 'c';
    },
  });
  const c = resolve(C);
  expect(c.data).toEqual('c');

  @Singleton()
  class D {
    public data = 'og';
  }

  register(D, {
    lifeTimes: Lifetimes.Transient,
    useClass: class Mock {
      public data = 'd';
    },
  });
  const d = resolve(D);
  expect(d.data).toEqual('d');
});

test('asserts that it resolve singleton with mocked dependency', () => {
  @Singleton()
  class A {
    public data = 'og';
  }

  @Singleton()
  class B {
    public data = 'og';

    constructor(public readonly a: A) {}
  }
  __registerMetaData(B, [A]);

  register(A, {
    useClass: class Mock {
      public data = 'replaced';
    },
  });

  const b = resolve(B);
  expect(b.data).toBe('og');
  expect(b.a.data).toBe('replaced');
});

test('asserts that it resolve scoped with mocked dependency', () => {
  @Scoped()
  class A {
    public data = 'og';
  }

  @Scoped()
  class B {
    public data = 'og';

    constructor(public readonly a: A) {}
  }
  __registerMetaData(B, [A]);

  register(A, {
    useClass: class Mock {
      public data = 'replaced';
    },
  });

  const b = resolve(B);
  expect(b.data).toBe('og');
  expect(b.a.data).toBe('replaced');
});

test('asserts that it resolve transient with mocked dependency', () => {
  @Transient()
  class A {
    public data = 'og';
  }

  @Transient()
  class B {
    public data = 'og';

    constructor(public a: A) {}
  }
  __registerMetaData(B, [A]);

  register(A, {
    useClass: class Mock {
      public data = 'replaced';
    },
  });

  const b = resolve(B);
  expect(b.data).toBe('og');
  expect(b.a.data).toBe('replaced');
});
