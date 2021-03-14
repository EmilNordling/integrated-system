import './application/surface_api';
import './_css_vars.css';
import './_reset.css';
import './_main.css';
import './_focus_ring.css';
import ReactDOM from 'react-dom';
import { App } from './components/app.component';
import { RDI } from '@modules/rdi/mod';
import { ApplicationService } from '@services/application.service';

// Resolves critical services
const applicationService = RDI.resolve(ApplicationService);

applicationService.boot();

ReactDOM.render(<App />, document.getElementById('root'));
