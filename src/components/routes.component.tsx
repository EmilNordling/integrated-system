import { Routes as RRoutes, Route } from 'react-router';
import { AppRouter } from '@components/app_router.component';
import { Index } from 'routes/index.component/mod';
import { Dashboard } from '../routes/dashboard.component/mod';

export interface Props {}

export function Routes(_: Props): JSX.Element {
  return (
    <AppRouter>
      <RRoutes>
        <Route path="*" element={<div>404 main</div>} />
        <Route path="/" element={<Index />} />
        <Route path="/app*" element={<Dashboard />} />
      </RRoutes>
    </AppRouter>
  );
}
