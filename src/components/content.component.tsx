import { Routes as RRoutes, Route } from 'react-router';
import { usePresentation } from '@modules/presentation/use_presentation';
import { SurfaceApi } from 'application/surface_api';
import { UIView } from './ui_view.component';
import { Scrollable } from '@components/scrollable.component';
import { useDashboardStyle } from '@modules/use_dashboard_style';

interface Props {}

export function Content(_: Props): JSX.Element {
  const presentation = usePresentation(SurfaceApi.ui.views.routes);
  useDashboardStyle();

  return (
    <Scrollable>
      <RRoutes>
        {presentation.routes.map((viewModel) => (
          <Route key={viewModel.id} path={viewModel.routeTo}>
            <UIView model={viewModel} />
          </Route>
        ))}
      </RRoutes>
    </Scrollable>
  );
}
