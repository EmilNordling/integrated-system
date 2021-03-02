import { Singleton } from 'one-atom';

@Singleton()
export class ApplicationService {
  public debug = false;

  constructor() {
    // Empty
  }
}
