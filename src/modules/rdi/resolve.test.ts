import { Scoped, Singleton, Transient } from './attributes';
import { __registerMetaData } from './meta';
import { resolve } from './resolve';
import { flushAll, flushRegisteredServices, flushSingletons } from './_flush';
import { register } from './_register';

afterEach(() => {
  flushAll();
});

test('asserts that it resolve nestled tree consisting of only singletons', () => {
  const fn = jest.fn();
  const call_amount = 4;

  @Singleton()
  class D {
    constructor() {
      fn();
    }
  }

  @Singleton()
  class C {
    constructor() {
      fn();
    }
  }

  @Singleton()
  class B {
    constructor(public readonly c: C, public readonly d: D) {
      fn();
    }
  }
  __registerMetaData(B, [C, D]);

  @Singleton()
  class A {
    constructor(public readonly c: C, public readonly b: B) {
      fn();
    }
  }
  __registerMetaData(A, [C, B]);

  function regardless_of_resolved_order_this_should_not_throw(a: A, b: B, c: C, d: D): void {
    expect(c).toBe(a.c);
    expect(b).toBe(a.b);
    expect(c).toBe(a.b.c);
    expect(d).toBe(a.b.d);
    expect(d).toBe(b.d);
    expect(c).toBe(b.c);

    expect(a).toBeInstanceOf(A);
    expect(a.b).toBeInstanceOf(B);
    expect(a.b.c).toBeInstanceOf(C);
    expect(a.b.d).toBeInstanceOf(D);
    expect(a.c).toBeInstanceOf(C);
    expect(b).toBeInstanceOf(B);
    expect(b.c).toBeInstanceOf(C);
    expect(b.d).toBeInstanceOf(D);
    expect(c).toBeInstanceOf(C);
    expect(d).toBeInstanceOf(D);
  }

  try {
    const a = resolve(A);
    const b = resolve(B);
    const c = resolve(C);
    const d = resolve(D);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order A -> B -> C -> D

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const a = resolve(A);
    const b = resolve(B);
    const d = resolve(D);
    const c = resolve(C);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order A -> B -> D -> C

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const a = resolve(A);
    const c = resolve(C);
    const d = resolve(D);
    const b = resolve(B);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order A -> C -> D -> B

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const a = resolve(A);
    const c = resolve(C);
    const b = resolve(B);
    const d = resolve(D);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order A -> C -> B -> D

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const a = resolve(A);
    const d = resolve(D);
    const b = resolve(B);
    const c = resolve(C);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order A -> D -> B -> C

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const a = resolve(A);
    const d = resolve(D);
    const c = resolve(C);
    const b = resolve(B);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order A -> D -> C -> B

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const b = resolve(B);
    const a = resolve(A);
    const c = resolve(C);
    const d = resolve(D);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order B -> A -> C -> D

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const b = resolve(B);
    const a = resolve(A);
    const d = resolve(D);
    const c = resolve(C);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order B -> A -> D -> C

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const b = resolve(B);
    const c = resolve(C);
    const a = resolve(A);
    const d = resolve(D);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order B -> C -> A -> D

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const b = resolve(B);
    const c = resolve(C);
    const d = resolve(D);
    const a = resolve(A);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order B -> C -> D -> A

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const b = resolve(B);
    const d = resolve(D);
    const a = resolve(A);
    const c = resolve(C);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order B -> D -> A -> C

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const b = resolve(B);
    const d = resolve(D);
    const c = resolve(C);
    const a = resolve(A);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order B -> D -> C -> A

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const c = resolve(C);
    const a = resolve(A);
    const b = resolve(B);
    const d = resolve(D);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order C -> A -> B -> D

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const c = resolve(C);
    const a = resolve(A);
    const d = resolve(D);
    const b = resolve(B);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order C -> A -> D -> B

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const c = resolve(C);
    const b = resolve(B);
    const a = resolve(A);
    const d = resolve(D);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order C -> B -> A -> D

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const c = resolve(C);
    const b = resolve(B);
    const d = resolve(D);
    const a = resolve(A);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order C -> B -> D -> A

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const c = resolve(C);
    const d = resolve(D);
    const b = resolve(B);
    const a = resolve(A);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order C -> D -> B -> A

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const c = resolve(C);
    const d = resolve(D);
    const a = resolve(A);
    const b = resolve(B);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order C -> D -> A -> B

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const d = resolve(D);
    const a = resolve(A);
    const b = resolve(B);
    const c = resolve(C);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order D -> A -> B -> C

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const d = resolve(D);
    const a = resolve(A);
    const c = resolve(C);
    const b = resolve(B);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order D -> A -> C -> B

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const d = resolve(D);
    const b = resolve(B);
    const c = resolve(C);
    const a = resolve(A);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order D -> B -> C -> A

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const d = resolve(D);
    const b = resolve(B);
    const a = resolve(A);
    const c = resolve(C);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order D -> B -> A -> C

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const d = resolve(D);
    const c = resolve(C);
    const a = resolve(A);
    const b = resolve(B);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order D -> C -> A -> B

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const d = resolve(D);
    const c = resolve(C);
    const b = resolve(B);
    const a = resolve(A);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order D -> C -> B -> A

      failed at:
      ${error.message}
    `);
  }
});

test('asserts that it resolve nestled tree consisting of only scopes', () => {
  const fn = jest.fn();
  const call_amount = 9;

  @Scoped()
  class D {
    constructor() {
      fn();
    }
  }

  @Scoped()
  class C {
    constructor() {
      fn();
    }
  }

  @Scoped()
  class B {
    constructor(public readonly c: C, public readonly d: D) {
      fn();
    }
  }
  __registerMetaData(B, [C, D]);

  @Scoped()
  class A {
    constructor(public readonly c: C, public readonly b: B) {
      fn();
    }
  }
  __registerMetaData(A, [C, B]);

  function regardless_of_resolved_order_this_should_not_throw(a: A, b: B, c: C, d: D): void {
    expect(a.c).toBe(a.b.c);
    expect(b).not.toBe(a.b);
    expect(b.c).not.toBe(a.b.c);
    expect(c).not.toBe(a.b.c);
    expect(d).not.toBe(a.b.d);

    expect(a).toBeInstanceOf(A);
    expect(a.b).toBeInstanceOf(B);
    expect(a.b.c).toBeInstanceOf(C);
    expect(a.b.d).toBeInstanceOf(D);
    expect(a.c).toBeInstanceOf(C);
    expect(b).toBeInstanceOf(B);
    expect(b.c).toBeInstanceOf(C);
    expect(b.d).toBeInstanceOf(D);
    expect(c).toBeInstanceOf(C);
    expect(d).toBeInstanceOf(D);
  }

  try {
    const a = resolve(A);
    const b = resolve(B);
    const c = resolve(C);
    const d = resolve(D);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order A -> B -> C -> D

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const a = resolve(A);
    const b = resolve(B);
    const d = resolve(D);
    const c = resolve(C);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order A -> B -> D -> C

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const a = resolve(A);
    const c = resolve(C);
    const d = resolve(D);
    const b = resolve(B);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order A -> C -> D -> B

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const a = resolve(A);
    const c = resolve(C);
    const b = resolve(B);
    const d = resolve(D);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order A -> C -> B -> D

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const a = resolve(A);
    const d = resolve(D);
    const b = resolve(B);
    const c = resolve(C);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order A -> D -> B -> C

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const a = resolve(A);
    const d = resolve(D);
    const c = resolve(C);
    const b = resolve(B);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order A -> D -> C -> B

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const b = resolve(B);
    const a = resolve(A);
    const c = resolve(C);
    const d = resolve(D);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order B -> A -> C -> D

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const b = resolve(B);
    const a = resolve(A);
    const d = resolve(D);
    const c = resolve(C);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order B -> A -> D -> C

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const b = resolve(B);
    const c = resolve(C);
    const a = resolve(A);
    const d = resolve(D);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order B -> C -> A -> D

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const b = resolve(B);
    const c = resolve(C);
    const d = resolve(D);
    const a = resolve(A);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order B -> C -> D -> A

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const b = resolve(B);
    const d = resolve(D);
    const a = resolve(A);
    const c = resolve(C);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order B -> D -> A -> C

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const b = resolve(B);
    const d = resolve(D);
    const c = resolve(C);
    const a = resolve(A);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order B -> D -> C -> A

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const c = resolve(C);
    const a = resolve(A);
    const b = resolve(B);
    const d = resolve(D);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order C -> A -> B -> D

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const c = resolve(C);
    const a = resolve(A);
    const d = resolve(D);
    const b = resolve(B);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order C -> A -> D -> B

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const c = resolve(C);
    const b = resolve(B);
    const a = resolve(A);
    const d = resolve(D);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order C -> B -> A -> D

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const c = resolve(C);
    const b = resolve(B);
    const d = resolve(D);
    const a = resolve(A);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order C -> B -> D -> A

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const c = resolve(C);
    const d = resolve(D);
    const b = resolve(B);
    const a = resolve(A);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order C -> D -> B -> A

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const c = resolve(C);
    const d = resolve(D);
    const a = resolve(A);
    const b = resolve(B);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order C -> D -> A -> B

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const d = resolve(D);
    const a = resolve(A);
    const b = resolve(B);
    const c = resolve(C);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order D -> A -> B -> C

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const d = resolve(D);
    const a = resolve(A);
    const c = resolve(C);
    const b = resolve(B);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order D -> A -> C -> B

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const d = resolve(D);
    const b = resolve(B);
    const c = resolve(C);
    const a = resolve(A);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order D -> B -> C -> A

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const d = resolve(D);
    const b = resolve(B);
    const a = resolve(A);
    const c = resolve(C);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order D -> B -> A -> C

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const d = resolve(D);
    const c = resolve(C);
    const a = resolve(A);
    const b = resolve(B);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order D -> C -> A -> B

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const d = resolve(D);
    const c = resolve(C);
    const b = resolve(B);
    const a = resolve(A);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order D -> C -> B -> A

      failed at:
      ${error.message}
    `);
  }
});

test('asserts that it resolve nestled tree consisting of only transients', () => {
  const fn = jest.fn();
  const call_amount = 10;

  @Transient()
  class D {
    constructor() {
      fn();
    }
  }

  @Transient()
  class C {
    constructor() {
      fn();
    }
  }

  @Transient()
  class B {
    constructor(public readonly c: C, public readonly d: D) {
      fn();
    }
  }
  __registerMetaData(B, [C, D]);

  @Transient()
  class A {
    constructor(public readonly c: C, public readonly b: B) {
      fn();
    }
  }
  __registerMetaData(A, [C, B]);

  function regardless_of_resolved_order_this_should_not_throw(a: A, b: B, c: C, d: D): void {
    expect(a.c).not.toBe(a.b.c);
    expect(b).not.toBe(a.b);
    expect(b.c).not.toBe(a.b.c);
    expect(c).not.toBe(a.b.c);
    expect(d).not.toBe(a.b.d);

    expect(a).toBeInstanceOf(A);
    expect(a.b).toBeInstanceOf(B);
    expect(a.b.c).toBeInstanceOf(C);
    expect(a.b.d).toBeInstanceOf(D);
    expect(a.c).toBeInstanceOf(C);
    expect(b).toBeInstanceOf(B);
    expect(b.c).toBeInstanceOf(C);
    expect(b.d).toBeInstanceOf(D);
    expect(c).toBeInstanceOf(C);
    expect(d).toBeInstanceOf(D);
  }

  try {
    const a = resolve(A);
    const b = resolve(B);
    const c = resolve(C);
    const d = resolve(D);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order Order A -> B -> C -> D

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const a = resolve(A);
    const b = resolve(B);
    const d = resolve(D);
    const c = resolve(C);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order A -> B -> D -> C

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const a = resolve(A);
    const c = resolve(C);
    const d = resolve(D);
    const b = resolve(B);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order A -> C -> D -> B

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const a = resolve(A);
    const c = resolve(C);
    const b = resolve(B);
    const d = resolve(D);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order A -> C -> B -> D

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const a = resolve(A);
    const d = resolve(D);
    const b = resolve(B);
    const c = resolve(C);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order A -> D -> B -> C

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const a = resolve(A);
    const d = resolve(D);
    const c = resolve(C);
    const b = resolve(B);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order A -> D -> C -> B

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const b = resolve(B);
    const a = resolve(A);
    const c = resolve(C);
    const d = resolve(D);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order B -> A -> C -> D

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const b = resolve(B);
    const a = resolve(A);
    const d = resolve(D);
    const c = resolve(C);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order B -> A -> D -> C

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const b = resolve(B);
    const c = resolve(C);
    const a = resolve(A);
    const d = resolve(D);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order B -> C -> A -> D

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const b = resolve(B);
    const c = resolve(C);
    const d = resolve(D);
    const a = resolve(A);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order B -> C -> D -> A

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const b = resolve(B);
    const d = resolve(D);
    const a = resolve(A);
    const c = resolve(C);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order B -> D -> A -> C

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const b = resolve(B);
    const d = resolve(D);
    const c = resolve(C);
    const a = resolve(A);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order B -> D -> C -> A

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const c = resolve(C);
    const a = resolve(A);
    const b = resolve(B);
    const d = resolve(D);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order C -> A -> B -> D

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const c = resolve(C);
    const a = resolve(A);
    const d = resolve(D);
    const b = resolve(B);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order C -> A -> D -> B

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const c = resolve(C);
    const b = resolve(B);
    const a = resolve(A);
    const d = resolve(D);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order C -> B -> A -> D

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const c = resolve(C);
    const b = resolve(B);
    const d = resolve(D);
    const a = resolve(A);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order C -> B -> D -> A

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const c = resolve(C);
    const d = resolve(D);
    const b = resolve(B);
    const a = resolve(A);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order C -> D -> B -> A

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const c = resolve(C);
    const d = resolve(D);
    const a = resolve(A);
    const b = resolve(B);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order C -> D -> A -> B

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const d = resolve(D);
    const a = resolve(A);
    const b = resolve(B);
    const c = resolve(C);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order D -> A -> B -> C

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const d = resolve(D);
    const a = resolve(A);
    const c = resolve(C);
    const b = resolve(B);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order D -> A -> C -> B

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const d = resolve(D);
    const b = resolve(B);
    const c = resolve(C);
    const a = resolve(A);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order D -> B -> C -> A

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const d = resolve(D);
    const b = resolve(B);
    const a = resolve(A);
    const c = resolve(C);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order D -> B -> A -> C

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const d = resolve(D);
    const c = resolve(C);
    const a = resolve(A);
    const b = resolve(B);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order D -> C -> A -> B

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const d = resolve(D);
    const c = resolve(C);
    const b = resolve(B);
    const a = resolve(A);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order D -> C -> B -> A

      failed at:
      ${error.message}
    `);
  }
});

test('asserts that it resolve nestled tree consisting of mixed lifetimes', () => {
  const fn = jest.fn();
  const call_amount = 7;
  let a_count = 0;
  let b_count = 0;
  let c_count = 0;
  let d_count = 0;

  @Transient()
  class D {
    public who = 'd';
    constructor() {
      d_count++;
      fn();
    }
  }

  @Singleton()
  class C {
    public who = 'c';
    public nbr = 0;
    constructor() {
      c_count++;
      fn();
      this.nbr = c_count;
    }
  }

  @Scoped()
  class B {
    public who = 'b';
    constructor(public readonly c: C, public readonly d: D) {
      b_count++;
      fn();
    }
  }
  __registerMetaData(B, [C, D]);

  @Transient()
  class A {
    public who = 'a';
    constructor(public readonly c: C, public readonly b: B) {
      a_count++;
      fn();
    }
  }
  __registerMetaData(A, [C, B]);

  function regardless_of_resolved_order_this_should_not_throw(a: A, b: B, c: C, d: D): void {
    expect(a.c).toBe(a.b.c);
    expect(a.c).toBe(c);
    expect(b.c).toBe(a.b.c);
    expect(b.c).toBe(c);

    expect(a.b.d).not.toBe(b.d);
    expect(a.b.d).not.toBe(d);
    expect(b.d).not.toBe(d);

    expect(a.b).not.toBe(b);

    expect(a).toBeInstanceOf(A);
    expect(a.b).toBeInstanceOf(B);
    expect(a.b.c).toBeInstanceOf(C);
    expect(a.b.d).toBeInstanceOf(D);
    expect(a.c).toBeInstanceOf(C);
    expect(b).toBeInstanceOf(B);
    expect(b.c).toBeInstanceOf(C);
    expect(b.d).toBeInstanceOf(D);
    expect(c).toBeInstanceOf(C);
    expect(d).toBeInstanceOf(D);

    expect(a_count).toEqual(1);
    expect(b_count).toEqual(2);
    expect(c_count).toEqual(1);
    expect(d_count).toEqual(3);
    a_count = 0;
    b_count = 0;
    c_count = 0;
    d_count = 0;
  }

  try {
    const a = resolve(A);
    const b = resolve(B);
    const c = resolve(C);
    const d = resolve(D);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order Order A -> B -> C -> D

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const a = resolve(A);
    const b = resolve(B);
    const d = resolve(D);
    const c = resolve(C);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order A -> B -> D -> C

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const a = resolve(A);
    const c = resolve(C);
    const d = resolve(D);
    const b = resolve(B);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order A -> C -> D -> B

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const a = resolve(A);
    const c = resolve(C);
    const b = resolve(B);
    const d = resolve(D);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order A -> C -> B -> D

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const a = resolve(A);
    const d = resolve(D);
    const b = resolve(B);
    const c = resolve(C);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order A -> D -> B -> C

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const a = resolve(A);
    const d = resolve(D);
    const c = resolve(C);
    const b = resolve(B);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order A -> D -> C -> B

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const b = resolve(B);
    const a = resolve(A);
    const c = resolve(C);
    const d = resolve(D);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order B -> A -> C -> D

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const b = resolve(B);
    const a = resolve(A);
    const d = resolve(D);
    const c = resolve(C);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order B -> A -> D -> C

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const b = resolve(B);
    const c = resolve(C);
    const a = resolve(A);
    const d = resolve(D);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order B -> C -> A -> D

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const b = resolve(B);
    const c = resolve(C);
    const d = resolve(D);
    const a = resolve(A);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order B -> C -> D -> A

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const b = resolve(B);
    const d = resolve(D);
    const a = resolve(A);
    const c = resolve(C);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order B -> D -> A -> C

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const b = resolve(B);
    const d = resolve(D);
    const c = resolve(C);
    const a = resolve(A);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order B -> D -> C -> A

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const c = resolve(C);
    const a = resolve(A);
    const b = resolve(B);
    const d = resolve(D);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order C -> A -> B -> D

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const c = resolve(C);
    const a = resolve(A);
    const d = resolve(D);
    const b = resolve(B);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order C -> A -> D -> B

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const c = resolve(C);
    const b = resolve(B);
    const a = resolve(A);
    const d = resolve(D);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order C -> B -> A -> D

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const c = resolve(C);
    const b = resolve(B);
    const d = resolve(D);
    const a = resolve(A);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order C -> B -> D -> A

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const c = resolve(C);
    const d = resolve(D);
    const b = resolve(B);
    const a = resolve(A);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order C -> D -> B -> A

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const c = resolve(C);
    const d = resolve(D);
    const a = resolve(A);
    const b = resolve(B);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order C -> D -> A -> B

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const d = resolve(D);
    const a = resolve(A);
    const b = resolve(B);
    const c = resolve(C);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order D -> A -> B -> C

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const d = resolve(D);
    const a = resolve(A);
    const c = resolve(C);
    const b = resolve(B);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order D -> A -> C -> B

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const d = resolve(D);
    const b = resolve(B);
    const c = resolve(C);
    const a = resolve(A);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order D -> B -> C -> A

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const d = resolve(D);
    const b = resolve(B);
    const a = resolve(A);
    const c = resolve(C);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order D -> B -> A -> C

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const d = resolve(D);
    const c = resolve(C);
    const a = resolve(A);
    const b = resolve(B);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order D -> C -> A -> B

      failed at:
      ${error.message}
    `);
  }

  flushSingletons();
  fn.mockReset();
  try {
    const d = resolve(D);
    const c = resolve(C);
    const b = resolve(B);
    const a = resolve(A);
    regardless_of_resolved_order_this_should_not_throw(a, b, c, d);
    expect(fn).toHaveBeenCalledTimes(call_amount);
  } catch (error) {
    throw new Error(`
      Order D -> C -> B -> A

      failed at:
      ${error.message}
    `);
  }
});

test('asserts that it throw an error if cyclic dependency is detected', () => {
  @Singleton()
  class A {
    constructor(public a: A) {}
  }
  __registerMetaData(A, [A]);

  expect(() => resolve(A)).toThrow();

  @Scoped()
  class B {
    constructor(public b: B) {}
  }
  __registerMetaData(B, [B]);

  expect(() => resolve(B)).toThrow();

  @Transient()
  class C {
    constructor(public c: C) {}
  }
  __registerMetaData(C, [C]);

  expect(() => resolve(C)).toThrow();
});

test('asserts that it throw an error if an service is not registered', () => {
  @Singleton()
  class A {}

  @Scoped()
  class B {}

  @Transient()
  class C {}

  flushRegisteredServices();

  expect(() => resolve(A)).toThrow();
  expect(() => resolve(B)).toThrow();
  expect(() => resolve(C)).toThrow();
});

test('asserts that it throw an error if an dependency is not registered', () => {
  class X {}

  @Singleton()
  class A {
    constructor(public x: X) {
      // Empty
    }
  }
  __registerMetaData(A, [X]);

  expect(() => resolve(A)).toThrow();
});

test('asserts that it throw an error if lifetime is not registered', () => {
  @Singleton()
  class A {
    constructor() {
      // Empty
    }
  }

  register(A, {
    // @ts-ignore
    lifeTimes: -1,
    useClass: class {},
  });

  expect(() => resolve(A)).toThrowError('The service lacks a lifetime');
});
