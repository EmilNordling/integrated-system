import { Singleton } from '@modules/rdi/mod';
import { __sprinkelMetaData } from '@modules/rdi/meta';

export enum EnvLocation {
  Tauri = 0,
  Desktop = 1 << 0,
  Mobile = 1 << 1,
}

@Singleton()
export class EnvironmentService {
  private static readonly IS_MOBILE_REGEX =
    /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i;

  private static readonly IS_IOS_REGEX = /iPad|iPhone|iPod/;

  public get locationIsIOS(): boolean {
    // Specific constant for iOS devices
    // http://racase.com.np/javascript-how-to-detect-if-device-is-ios/
    return EnvironmentService.IS_IOS_REGEX.test(navigator.userAgent) && !window.MSStream;
  }

  constructor() {
    // Empty
  }

  public locationIs(requestedLocation: number): boolean {
    const statements: boolean[] = [];

    if ((requestedLocation & EnvLocation.Tauri) === EnvLocation.Tauri) {
      statements.push(!!window.__TAURI__);
    }

    if ((requestedLocation & EnvLocation.Mobile) === EnvLocation.Mobile) {
      statements.push(!!EnvironmentService.IS_MOBILE_REGEX.test(navigator.userAgent));
    }

    if ((requestedLocation & EnvLocation.Desktop) === EnvLocation.Desktop) {
      statements.push(!EnvironmentService.IS_MOBILE_REGEX.test(navigator.userAgent));
    }

    return statements.filter(Boolean).length > 0;
  }
}
// A vite plugin will be added later
__sprinkelMetaData(EnvironmentService, []);
