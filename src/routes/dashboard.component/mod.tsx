import { lazy, Suspense } from 'react';
import { AppDesktopLayout } from '@components/app_desktop_layout.component';
import { skeletons } from './skeleton.component';
import { Content } from '@components/content.component';

interface Props {}

const Sidebar = lazy(() => import('@components/sidebar.component/mod').then((module) => ({ default: module['Sidebar'] })));

export function Dashboard(_: Props): JSX.Element {
  return (
    <AppDesktopLayout
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
