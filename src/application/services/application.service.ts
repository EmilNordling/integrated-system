import dayjs from 'dayjs';
import { Singleton, __sprinkelMetaData } from '@modules/rdi/mod';
import { DiagnosticsService } from './diagnostics.service/mod';
import { RouterService } from './router.service';
import type { Reporter } from './trace_source.service/reporter';
import type { Level } from './trace_source.service/level';

export enum BootCycleEvents {
  Boot_Before,
  LoadExtensions_Before,
  LoadExtensions_After,
  Boot_After,
}

type BootFn = () => void | Promise<void>;

@Singleton()
export class ApplicationService {
  private static readonly TRACE_ORIGIN = 'ApplicationService';
  private readonly interceptedCycleEvents = new Map<BootCycleEvents, BootFn[]>();

  constructor(private readonly diagnostics: DiagnosticsService) {
    diagnostics.traceSource.info(`Session date: ${dayjs().format('YYYY-MM-DD | [UTC offset]: Z')}`);
  }

  public async boot(): Promise<void> {
    this.diagnostics.traceSource.info('boot start', ApplicationService.TRACE_ORIGIN);

    try {
      await this.runCycleEvents(BootCycleEvents.Boot_Before);
      await this.runCycleEvents(BootCycleEvents.LoadExtensions_Before);
      await this.runCycleEvents(BootCycleEvents.LoadExtensions_After);
      await this.runCycleEvents(BootCycleEvents.Boot_After);
    } catch (error: unknown) {
      this.diagnostics.traceSource.error(`unknown error was thrown: ${error}`, ApplicationService.TRACE_ORIGIN);
    } finally {
      this.diagnostics.traceSource.info('boot done', ApplicationService.TRACE_ORIGIN);
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

  public addTraceSourceReporter(reporter: Reporter): void {
    this.diagnostics.traceSource.addReporter(reporter);
  }

  public setTraceSourceLevel(level: Level): void {
    this.diagnostics.traceSource.setLevel(level);
  }

  private async runCycleEvents(cycle: BootCycleEvents): Promise<void> {
    const fns = this.interceptedCycleEvents.get(cycle) ?? [];

    for (const fn of fns) {
      try {
        const _ = await fn();
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.diagnostics.traceSource.error(error.message, ApplicationService.TRACE_ORIGIN);

          return;
        }

        throw error;
      }
    }

    this.interceptedCycleEvents.delete(cycle);
  }
}
// A vite plugin will be added later
__sprinkelMetaData(ApplicationService, [DiagnosticsService, RouterService]);
