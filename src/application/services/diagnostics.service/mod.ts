import { Singleton } from '@modules/rdi/attributes';
import { __registerMetaData } from '@modules/rdi/meta';
import { TraceSourceService } from './trace_source.service';

@Singleton()
export class DiagnosticsService {
  constructor(public readonly traceSource: TraceSourceService) {
    // Empty
  }
}
// A vite plugin will be added later
__registerMetaData(DiagnosticsService, [TraceSourceService]);
