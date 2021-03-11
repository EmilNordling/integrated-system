import styled from 'styled-components';
import { AppController } from '@controllers/app.controller';
import { Middle } from './_middle';

interface Props {
  controller: AppController;
}

const elements = {
  container: styled.ul`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  `,
  top: styled.div`
    height: 45px;
    box-shadow: 0 1px 0 0 #e5e5e5;
  `,
  bottom: styled.div`
    height: 45px;
    box-shadow: 0 -1px 0 0 #e5e5e5;
  `,
};

export function Sidebar({ controller }: Props): JSX.Element {
  return (
    <elements.container>
      <Middle controller={controller} />
      <elements.bottom></elements.bottom>
    </elements.container>
  );
}
