/* eslint-disable @typescript-eslint/ban-types */
import { ConcurrentPresentation } from './concurrent_presentation';
import { FlowPresentation } from './flow_presentation';
import { Presentation } from './presentation';
import { SynchronousPresentation } from './synchronous_presentation';

test('asserts SynchronousPresentation is created and added to debug', () => {
  const presentation = Presentation.create({
    test: 'test',
  });

  expect(presentation).toBeInstanceOf(SynchronousPresentation);
  expect((globalThis as any)['__debug_ref__'].has(presentation)).toBeTruthy();
});

test('asserts  is created and added to debug', () => {
  const presentation = Presentation.createConcurrent({
    test: 'test',
  });

  expect(presentation).toBeInstanceOf(ConcurrentPresentation);
  expect((globalThis as any)['__debug_ref__'].has(presentation)).toBeTruthy();
});

test('asserts SynchronousPresentation is created and added to debug', () => {
  const presentation = Presentation.createFlow({
    initialValue: {
      test: 'test',
    },
  });

  expect(presentation).toBeInstanceOf(FlowPresentation);
  expect((globalThis as any)['__debug_ref__'].has(presentation)).toBeTruthy();
});
