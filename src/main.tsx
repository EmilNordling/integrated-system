import './application/surface_api';
import './_css_vars.css';
import './_reset.css';
import './_main.css';
import './_focus_ring.css';
import ReactDOM from 'react-dom';
import { App } from '@components/app.component';
import { RDI } from '@modules/rdi/mod';
import { ApplicationService } from '@services/application.service';
import { DefaultReporter } from '@services/trace_source.service/default_reporter';
import { Level } from '@services/trace_source.service/level';

const applicationService = RDI.resolve(ApplicationService);
applicationService.addTraceSourceReporter(new DefaultReporter());
applicationService.setTraceSourceLevel(Level.Verbose);

applicationService.boot();

const rootElement = document.getElementById('root');
if (rootElement == null) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
