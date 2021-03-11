import { Suspense, lazy } from 'react';
import { Routes as RRoutes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Layout as AppLayout } from 'routes/app.component/layout.component';
import { skeletons as appSkeletons } from 'routes/app.component/skeleton.component';

// Exports all skeleton views for external SSR

export interface Props {}

function lazyLoadApp(): JSX.Element {
  const LazyComponent = lazy(() => import('../routes/app.component/mod').then((module) => ({ default: module['App'] })));

  return (
    <Suspense fallback={<AppLayout contentSlot={<appSkeletons.content />} sidebarSlot={<appSkeletons.sideBar />} />}>
      <LazyComponent />
    </Suspense>
  );
}

function lazyLoadHome(): JSX.Element {
  const LazyComponent = lazy(() => import('../routes/home.component/mod').then((module) => ({ default: module['Home'] })));

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
        <Route path="/" element={lazyLoadHome()} />
        <Route path="/app/*" element={lazyLoadApp()} />
      </RRoutes>
    </BrowserRouter>
  );
}
