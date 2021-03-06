import { Presentation } from '@modules/presentation/presentation';
import { IS_IOS, IS_MOBILE } from '../constants';

let isMobile: boolean | null = null;
let isIOS: boolean | null = null;

export const deviceState = Presentation.create({
  // isMobile get/set pair
  get isMobile(): boolean {
    if (isMobile != null) return isMobile;

    return !!IS_MOBILE.test(navigator.userAgent);
  },
  set isMobile(override: boolean) {
    isMobile = override;
  },

  // isIOS get/set pair
  get isIOS(): boolean {
    if (isIOS != null) return isIOS;

    return IS_IOS.test(navigator.userAgent) && !window.MSStream;
  },
  set isIOS(override: boolean) {
    isIOS = override;
  },
});
