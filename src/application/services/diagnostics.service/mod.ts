import { Singleton } from '@modules/rdi/attributes';
import { __sprinkelMetaData } from '@modules/rdi/meta';
import { TraceSourceService } from '../trace_source.service/mod';

@Singleton()
export class DiagnosticsService {
  constructor(public readonly traceSource: TraceSourceService) {
    // Empty
  }
}
// A vite plugin will be added later
__sprinkelMetaData(DiagnosticsService, [TraceSourceService]);
