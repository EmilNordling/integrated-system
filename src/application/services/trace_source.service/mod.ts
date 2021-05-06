import { Scoped } from '@modules/rdi/attributes';
import { __sprinkelMetaData } from '@modules/rdi/meta';
import dayjs from 'dayjs';
import { Level } from './level';
import type { Message } from './_common';
import type { Reporter } from './reporter';

export * from './level';

@Scoped()
export class TraceSourceService {
  public printTimeStamp = false;
  public printOrigin = false;
  public printLevel = true;
  private currentBitWise = this.getBitWiseFlag(Level.Verbose);
  private reporters: Reporter[] = [];

  constructor() {
    // Empty
  }

  public addReporter(reporter: Reporter): void {
    this.reporters.push(reporter);
  }

  public info(message: string, origin?: string): void {
    this.trace(Level.Verbose, message, origin);
  }

  public error(message: string, origin?: string): void {
    this.trace(Level.Error, message, origin);
  }

  public setLevel(level: Level): void {
    const newFlag = this.getBitWiseFlag(level);

    this.currentBitWise = newFlag;
  }

  private trace(level: Level, message: string, origin?: string): void {
    const msg = this.createMessage(level, message, origin);

    queueMicrotask(() => {
      this.printMessage(msg);
    });
  }

  private createMessage(level: Level, message: string, origin?: string): Message {
    return {
      level,
      message,
      origin: origin ?? 'Generic',
      timestamp: dayjs(),
    };
  }

  private printMessage(msg: Message): void {
    this.reporters.forEach((reporter) => {
      try {
        reporter.trace(msg, {
          currentBitWise: this.currentBitWise,
          printLevel: this.printLevel,
          printOrigin: this.printOrigin,
          printTimeStamp: this.printTimeStamp,
        });
      } catch (_: unknown) {
        // noop
      }
    });
  }

  private getBitWiseFlag(level: Level): number {
    let bitWise: number;

    switch (level) {
      case Level.Error:
        bitWise = Level.Error;
        break;
      case Level.Warn:
        bitWise = Level.Warn | Level.Error;
        break;
      case Level.Info:
        bitWise = Level.Info | Level.Warn | Level.Error;
        break;
      case Level.Debug:
        bitWise = Level.Debug | Level.Info | Level.Warn | Level.Error;
        break;
      case Level.Verbose:
        bitWise = Level.Verbose | Level.Debug | Level.Info | Level.Warn | Level.Error;
        break;
      default:
        bitWise = 0;
    }

    return bitWise;
  }
}
// A vite plugin will be added later
__sprinkelMetaData(TraceSourceService, []);
