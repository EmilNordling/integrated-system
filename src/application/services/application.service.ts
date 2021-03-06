import { Singleton } from '@modules/rdi/mod';

@Singleton()
export class ApplicationService {
  public debug = false;

  constructor() {
    // Empty
  }
}
