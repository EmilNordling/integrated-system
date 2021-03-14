import { Singleton } from '@modules/rdi/mod';
import { __registerMetaData } from '@modules/rdi/meta';

@Singleton()
export class EnvironmentService {
  constructor() {
    // Empty
  }
}
// A vite plugin will be added later
__registerMetaData(EnvironmentService, []);
