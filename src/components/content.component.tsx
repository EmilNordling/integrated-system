import { Routes as RRoutes, Route } from 'react-router';
import { usePresentation } from '@modules/presentation/use_presentation';
import { SurfaceApi } from 'application/surface_api';
import { Fragment } from 'react';

interface Props {}

export function Content(_: Props): JSX.Element {
  const presentation = usePresentation(SurfaceApi.ui.views.routes);

  return (
    <Fragment>
      <RRoutes>
        {presentation.routes.map((route) => (
          <Route key={route.id} path={route.routeTo}>
            <div>{route.id}</div>
          </Route>
        ))}
      </RRoutes>
    </Fragment>
  );
}
