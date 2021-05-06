import { Fragment } from 'react';

function SideBar(): JSX.Element {
  return <Fragment>skeleton</Fragment>;
}

function Content(): JSX.Element {
  return <Fragment>skeleton</Fragment>;
}

export const skeletons = Object.freeze({
  sideBar: SideBar,
  content: Content,
});
