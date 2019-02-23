import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

export class AppHammerGestureConfig extends HammerGestureConfig {
  overrides = {
    // http://hammerjs.github.io/recognizer-pan/
    pan: { },
    // http://hammerjs.github.io/recognizer-pinch/
    pinch: { },
    // http://hammerjs.github.io/recognizer-press/
    press: { },
    // http://hammerjs.github.io/recognizer-rotate/
    rotate: { },
    // http://hammerjs.github.io/recognizer-swipe/
    swipe: { },
    // http://hammerjs.github.io/recognizer-tap/
    tap: { }
  }
}
export const hammerProvider = {
  provide: HAMMER_GESTURE_CONFIG,
  useClass: AppHammerGestureConfig
}
