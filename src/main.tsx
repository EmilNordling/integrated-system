import './_css_vars.css';
import './_reset.css';
import './_main.css';
import './_focus_ring.css';
import ReactDOM from 'react-dom';
import { App } from './components/app.component';
import { RDI } from '@modules/rdi/mod';
import { ApplicationService } from '@services/application.service';
import { UiBindingsController } from '@controllers/ui_bindings.controller/mod';

// Resolves critical services
const applicationService = RDI.resolve(ApplicationService);
RDI.resolve(UiBindingsController);

applicationService.boot();

ReactDOM.render(<App />, document.getElementById('root'));
