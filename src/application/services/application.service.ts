import * as dayjs from 'dayjs';
import { Singleton, __registerMetaData } from '@modules/rdi/mod';
import { DiagnosticsService } from './diagnostics.service/mod';

export enum BootCycleEvents {
  Boot_Before,
  LoadExtensions_Before,
  LoadExtensions_After,
  Boot_After,
}

type BootFn = () => void | Promise<void>;

@Singleton()
export class ApplicationService {
  public debug = false;
  private readonly interceptedCycleEvents = new Map<BootCycleEvents, BootFn[]>();

  constructor(private readonly diagnostics: DiagnosticsService) {
    diagnostics.traceSource.info(`Session date: ${dayjs().format('YYYY-MM-DD | [UTC offset]: Z')}`);
  }

  public async boot(): Promise<void> {
    try {
      await this.runCycleEvents(BootCycleEvents.Boot_Before);
      await this.runCycleEvents(BootCycleEvents.LoadExtensions_Before);
      await this.runCycleEvents(BootCycleEvents.LoadExtensions_After);
      await this.runCycleEvents(BootCycleEvents.Boot_After);
    } catch (error: unknown) {
      this.diagnostics.traceSource.error(`unknown error was thrown: ${error}`);
    }
  }

  public interceptBootCycle(cycle: BootCycleEvents, fn: BootFn): void {
    let fns = this.interceptedCycleEvents.get(cycle);
    if (fns == null) {
      fns = [];
      this.interceptedCycleEvents.set(cycle, fns);
    }

    fns.push(fn);
  }

  private async runCycleEvents(cycle: BootCycleEvents): Promise<void> {
    const fns = this.interceptedCycleEvents.get(cycle) ?? [];

    for (const fn of fns) {
      try {
        const _ = await fn();
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.diagnostics.traceSource.error(error.message);

          return;
        }

        throw error;
      }
    }

    this.interceptedCycleEvents.delete(cycle);
  }
}
// A vite plugin will be added later
__registerMetaData(ApplicationService, [DiagnosticsService]);
