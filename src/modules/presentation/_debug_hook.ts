import { Emitter } from '@modules/emitter';

(globalThis as any)['__debug_ref__'] ?? ((globalThis as any)['__debug_ref__'] = new WeakSet());
(globalThis as any)['__debug_hook__'] ?? ((globalThis as any)['__debug_hook__'] = new Emitter());
