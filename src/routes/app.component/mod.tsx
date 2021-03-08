import { lazy, Suspense, useEffect } from 'react';
import { AppController } from '@controllers/app.controller';
import { addDashboardStyle } from '@modules/add_dashboard_style';
import { useService } from '@modules/rdi/use_service';
import { Layout } from './_layout.component';
import { Text } from '@components/text.component';

interface Props {}

// const elements = {}

const Sidebar = lazy(() => import('./_sidebar.component').then((module) => ({ default: module['Sidebar'] })));
const Content = lazy(() => import('./_content.component').then((module) => ({ default: module['Content'] })));

export function App(_: Props): JSX.Element {
  const controller = useService(AppController);

  useEffect(() => {
    return addDashboardStyle();
  }, []);

  return (
    <Layout
      sidebarSlot={
        <Suspense fallback={'loading'}>
          <Sidebar controller={controller} />
        </Suspense>
      }
      contentSlot={
        <Suspense fallback={'...'}>
          <Content controller={controller} />
        </Suspense>
      }
    />
  );
}
