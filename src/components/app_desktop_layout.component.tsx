import { styled } from '@stitches/react';
import { memo, ReactNode, SyntheticEvent } from 'react';

interface Props {
  sidebarSlot: ReactNode;
  contentSlot: ReactNode;
}

const S_Container = styled('div', {
  display: 'grid',
  width: '100%',
  height: '100%',
  gridColumnGap: 0,
  gridRowGap: 0,
  gridTemplateAreas: '"sidebar content"',
  gridTemplateColumns: 'auto 1fr',
});

const S_Sidebar = styled('div', {
  height: '100vh',
  width: '230px',
  background: '#fafafa',
  gridArea: 'sidebar',
  borderRight: '1px solid var(--global-border)',
});

const S_Content = styled('div', {
  position: 'relative',
  display: 'flex',
  overflow: 'auto',
  gridArea: 'content',
  flexDirection: 'column',
  overflowX: 'hidden',
  WebkitOverflowScrolling: 'touch',
  background: 'var(--global-background)',
});

export const AppDesktopLayout = memo(function AppDesktopLayout({ sidebarSlot, contentSlot }: Props): JSX.Element {
  function handleContextMenu(event: SyntheticEvent<HTMLDivElement, MouseEvent>): void {
    event.preventDefault();
  }

  return (
    <S_Container onContextMenu={handleContextMenu}>
      <S_Sidebar>{sidebarSlot}</S_Sidebar>
      <S_Content>{contentSlot}</S_Content>
    </S_Container>
  );
});
