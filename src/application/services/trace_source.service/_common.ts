import type dayjs from 'dayjs';
import type { Level } from './level';

export interface Message {
  level: Level;
  timestamp: dayjs.Dayjs;
  origin: string;
  message: string;
}
