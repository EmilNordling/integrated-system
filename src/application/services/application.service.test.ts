import { RDI } from '@modules/rdi/mod';
import { ApplicationService, BootCycleEvents } from './application.service';

test('asserts boot order', async () => {
  const application = RDI.resolve(ApplicationService);
  const callOrder: BootCycleEvents[] = [];

  const bootBefore = jest.fn().mockImplementation(() => callOrder.push(BootCycleEvents.Boot_Before));
  const loadExtensionsBefore = jest.fn().mockImplementation(() => callOrder.push(BootCycleEvents.LoadExtensions_Before));
  const loadExtensionsAfter = jest.fn().mockImplementation(() => callOrder.push(BootCycleEvents.LoadExtensions_After));
  const bootAfter = jest.fn().mockImplementation(() => callOrder.push(BootCycleEvents.Boot_After));

  application.interceptBootCycle(BootCycleEvents.Boot_Before, bootBefore);
  application.interceptBootCycle(BootCycleEvents.Boot_After, bootAfter);
  application.interceptBootCycle(BootCycleEvents.LoadExtensions_Before, loadExtensionsBefore);
  application.interceptBootCycle(BootCycleEvents.LoadExtensions_After, loadExtensionsAfter);
  application.boot();

  // Flushes microtask queue
  await null; // await cycle
  await null; // await fn

  await null; // await cycle
  await null; // await fn

  await null; // await cycle
  await null; // await fn

  await null; // await cycle
  await null; // await fn

  expect(callOrder).toEqual([
    BootCycleEvents.Boot_Before,
    BootCycleEvents.LoadExtensions_Before,
    BootCycleEvents.LoadExtensions_After,
    BootCycleEvents.Boot_After,
  ]);
});
