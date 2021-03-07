import { __registerMetaData } from '@modules/rdi/meta';
import { Singleton } from '@modules/rdi/mod';
import { ModalService } from '@services/modal.service/mod';

@Singleton()
export class SettingsService {
  constructor(public readonly x: ModalService) {
    // Empty
  }
}
__registerMetaData(SettingsService, [ModalService]);
