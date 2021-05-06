import { Level } from './level';
import { Reporter, Options } from './reporter';
import { Message } from './_common';

export class DefaultReporter extends Reporter {
  public trace(msg: Message, { printLevel, printOrigin, printTimeStamp, currentBitWise }: Options): void {
    if ((msg.level & currentBitWise) !== msg.level) return;

    const parts: string[] = [];

    if (printTimeStamp) {
      parts.push(`[${msg.timestamp.format('HH:mm:ss:SSS')}]`);
    }

    if (printLevel) {
      parts.push(`[${this.levelEnumToString(msg.level)}]`);
    }

    if (printOrigin) {
      parts.push(`[${msg.origin}]`);
    }

    const str = `${parts.join(' ')} ${msg.message}`;

    if (msg.level === Level.Error) {
      console.error(str);

      return;
    }

    if (msg.level === Level.Warn) {
      console.log(str);

      return;
    }

    if (msg.level === Level.Info) {
      console.log(str);

      return;
    }

    console.log(str);
  }
}
