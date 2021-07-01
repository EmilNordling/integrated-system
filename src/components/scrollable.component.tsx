import * as RadixScrollArea from '@radix-ui/react-scroll-area';
import { styled } from '@stitches/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const SCROLLBAR_SIZE = 5;

const S_Root = styled(RadixScrollArea.Root, {
  width: '100%',
  height: '100%',
});

const S_Viewport = styled(RadixScrollArea.Viewport, {
  width: '100%',
  height: '100%',
});

const S_Scrollbar = styled(RadixScrollArea.Scrollbar, {
  display: 'flex',
  padding: 5,
  boxSizing: 'content-box',
  '&[data-orientation="vertical"]': {
    width: SCROLLBAR_SIZE,
  },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: SCROLLBAR_SIZE,
  },
});

const S_Thumb = styled(RadixScrollArea.Thumb, {
  flex: 1,
  background: '#dadada',
  borderRadius: SCROLLBAR_SIZE * 2,
});

const S_Corner = styled(RadixScrollArea.Corner, {});

export function Scrollable({ children }: Props): JSX.Element {
  return (
    <S_Root type="always">
      <S_Viewport>{children}</S_Viewport>

      <S_Scrollbar orientation="vertical">
        <S_Thumb />
      </S_Scrollbar>

      <S_Scrollbar orientation="horizontal">
        <S_Thumb />
      </S_Scrollbar>

      <S_Corner />
    </S_Root>
  );
}
