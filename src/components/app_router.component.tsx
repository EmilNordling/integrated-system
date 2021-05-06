import { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { RouterService } from '@services/router.service';
import { useService } from '@modules/rdi/mod';
import { BrowserHistory } from 'history';
import { Router } from 'react-router';
import { EnvironmentService, EnvLocation } from '@services/environment.service';

interface Props {
  children?: ReactNode;
  window?: Window;
}

// Implements https://github.com/ReactTraining/react-router/blob/dev/packages/react-router-dom/index.tsx#L95
export function AppRouter({ children, window: _window }: Props): JSX.Element {
  const routerService = useService(RouterService);
  const environmentService = useService(EnvironmentService);

  const historyRef = useRef<BrowserHistory>();
  if (historyRef.current == null) {
    if (environmentService.locationIs(EnvLocation.Tauri)) {
      historyRef.current = routerService.createHashHistory({ window: _window });
    } else {
      historyRef.current = routerService.createBrowserHistory({ window: _window });
    }
  }

  const history = historyRef.current;
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router action={state.action} location={state.location} navigator={history}>
      {children}
    </Router>
  );
}
