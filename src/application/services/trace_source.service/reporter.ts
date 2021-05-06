import { Level } from './level';
import { Message } from './_common';

export interface Options {
  currentBitWise: number;
  printTimeStamp: boolean;
  printOrigin: boolean;
  printLevel: boolean;
}

export abstract class Reporter {
  abstract trace(msg: Message, opt: Options): void;

  public levelEnumToString(level: Level): string {
    if ((level & Level.Error) === Level.Error) return 'error';
    if ((level & Level.Warn) === Level.Warn) return 'warn';
    if ((level & Level.Info) === Level.Info) return 'info';
    if ((level & Level.Debug) === Level.Debug) return 'debug';
    if ((level & Level.Verbose) === Level.Verbose) return 'verbose';

    throw new Error(`Could not convert ${level}`);
  }
}
