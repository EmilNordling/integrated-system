import { Suspense, lazy } from 'react';
import { Routes as RRoutes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

// Exports all skeleton views for external SSR
// qwe

export interface Props {}

function lazyLoadLinkedApps(): JSX.Element {
  const LazyComponent = lazy(() => import('../routes/apps.component/mod').then((module) => ({ default: module['Apps'] })));

  return (
    <Suspense fallback={'...'}>
      <LazyComponent />
    </Suspense>
  );
}

export function Routes(_: Props): JSX.Element {
  return (
    <BrowserRouter>
      <RRoutes>
        <Route path="*" element={<div>404 main</div>} />
        <Route path="/app/*" element={lazyLoadLinkedApps()} />
      </RRoutes>
    </BrowserRouter>
  );
}
