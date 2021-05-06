import { Fragment } from 'react';
import { FocusGuard } from 'focus-layers';
import { Routes } from './routes.component';

interface Props {}

export function App(_: Props): JSX.Element {
  return (
    <Fragment>
      <FocusGuard />

      <Routes />

      <FocusGuard />
    </Fragment>
  );
}
