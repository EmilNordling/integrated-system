import { Scoped } from '@modules/rdi/attributes';
import { __registerMetaData } from '@modules/rdi/meta';
import * as dayjs from 'dayjs';

export enum Level {
  Error = 1,
  Warn = 2,
  Info = 4,
  Debug = 8,
  Verbose = 16,
  None = 0,
}

type TraceFn = (message: string) => void;

@Scoped()
export class TraceSourceService {
  private currentBitWise = this.getBitFlag(Level.Verbose);

  constructor() {
    // Empty
  }

  public info(message: string): void {
    this.trace(Level.Verbose, message);
  }

  public error(message: string): void {
    this.trace(Level.Error, message);
  }

  public setLevel(level: Level): void {
    const newFlag = this.getBitFlag(level);

    this.currentBitWise = newFlag;
  }

  private trace(level: Level, message: string) {
    const msg = this.createMessage(level, message);

    if ((level & this.currentBitWise) === level) {
      this.printMessage(msg, level);
    }
  }

  private createMessage(level: Level, message: string): string {
    return `[${this.levelEnumToString(level)} - ${dayjs().format('HH:mm:ss:SSS')}] ${message}`;
  }

  private printMessage(str: string, level?: Level): void {
    if (level === Level.Error) {
      console.error(str);

      return;
    }

    if (level === Level.Warn) {
      console.log(str);

      return;
    }

    if (level === Level.Info) {
      console.log(str);

      return;
    }

    console.log(str);
  }

  private levelEnumToString(level: Level): string {
    if ((level & Level.Error) === Level.Error) return 'error  ';
    if ((level & Level.Warn) === Level.Warn) return 'warn   ';
    if ((level & Level.Info) === Level.Info) return 'info   ';
    if ((level & Level.Debug) === Level.Debug) return 'debug  ';
    if ((level & Level.Verbose) === Level.Verbose) return 'verbose';

    throw new Error('Can not assert with level "none"');
  }

  private getBitFlag(level: Level): number {
    let bitWise;

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
__registerMetaData(TraceSourceService, []);
