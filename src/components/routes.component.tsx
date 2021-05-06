import { Routes as RRoutes, Route } from 'react-router';
import { AppRouter } from '@components/app_router.component';
import { Home } from 'routes/home.component/mod';
import { Dashboard } from '../routes/dashboard.component/mod';

export interface Props {}

export function Routes(_: Props): JSX.Element {
  return (
    <AppRouter>
      <RRoutes>
        <Route path="*" element={<div>404 main</div>} />
        <Route path="/" element={<Home />} />
        <Route path="/app*" element={<Dashboard />} />
      </RRoutes>
    </AppRouter>
  );
}
