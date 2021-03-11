import { Shimmer } from '@components/shimmer.component';
import { Fragment } from 'react';

function SideBar(): JSX.Element {
  return (
    <Fragment>
      <Shimmer height={20} width={100} />
    </Fragment>
  );
}

function Content(): JSX.Element {
  return (
    <Fragment>
      <Shimmer height={20} width={100} />
    </Fragment>
  );
}

export const skeletons = Object.freeze({
  sideBar: SideBar,
  content: Content,
});
