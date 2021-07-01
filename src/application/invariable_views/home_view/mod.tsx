import { lazy } from 'react';

const Home = lazy(() => import('./home.component').then((module) => ({ default: module['Home'] })));

export function HomeView(): JSX.Element {
  return <Home />;
}
