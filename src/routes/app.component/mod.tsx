import { lazy, Suspense } from 'react';
import { Layout } from './layout.component';
import { skeletons } from './skeleton.component';

interface Props {}

// const elements = {}

const Sidebar = lazy(() => import('./_sidebar.component/mod').then((module) => ({ default: module['Sidebar'] })));
const Content = lazy(() => import('./_content.component').then((module) => ({ default: module['Content'] })));

export function App(_: Props): JSX.Element {
  return (
    <Layout
      sidebarSlot={
        <Suspense fallback={<skeletons.sideBar />}>
          <Sidebar />
        </Suspense>
      }
      contentSlot={
        <Suspense fallback={<skeletons.content />}>
          <Content />
        </Suspense>
      }
    />
  );
}
