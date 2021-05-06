import { styled } from '@stitches/react';
import { Nav } from './_nav';

interface Props {}

const S_Container = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const S_Bottom = styled('div', {
  height: '45px',
  boxShadow: '0 -1px 0 0 #e5e5e5',
});

export function Sidebar(_: Props): JSX.Element {
  return (
    <S_Container>
      <Nav />
      <S_Bottom>bottom</S_Bottom>
    </S_Container>
  );
}
