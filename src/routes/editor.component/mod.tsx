import { useEffect } from 'react';
import { addDashboardStyle } from '@modules/add_dashboard_style';
import styled from 'styled-components';

interface Props {}

const elements = {
  container: styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    background: #fbfbfb;
  `,
  rightSide: styled.div`
    flex: 1;
  `,
  leftSide: styled.div`
    width: 250px;
    border-left: 1px solid var(--global-border);
    background: var(--global-foreground);
  `,
};

export function Editor(_: Props): JSX.Element {
  return (
    <elements.container>
      <elements.rightSide>qwe</elements.rightSide>
      <elements.leftSide>qwe</elements.leftSide>
    </elements.container>
  );
}
