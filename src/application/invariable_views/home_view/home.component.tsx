import { styled } from '@stitches/react';

interface Props {}

const S_Content = styled('div', {
  padding: '20px',
});

export function Home(_: Props): JSX.Element {
  return (
    <S_Content>
      <h1>herre</h1>
    </S_Content>
  );
}
