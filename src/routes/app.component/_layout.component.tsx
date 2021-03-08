import styled from 'styled-components';

interface Props {
  sidebarSlot: JSX.Element | null;
  contentSlot: JSX.Element | null;
}

const elements = {
  container: styled.div`
    display: grid;
    width: 100%;
    height: 100%;
    grid-column-gap: 0;
    grid-row-gap: 0;
    grid-template-areas: 'sidebar content';
    grid-template-columns: 280px 1fr;
  `,
  sidebar: styled.div`
    grid-area: sidebar;
    display: flex;
    height: 100vh;
    border-right: 1px solid var(--global-border);
    flex-direction: column;
    background: var(--global-foreground);

    padding: 15px 15px 0;
  `,
  content: styled.div`
    grid-area: content;
    position: relative;
    display: flex;
    overflow: auto;
    flex-direction: column;
    -webkit-overflow-scrolling: touch;
    margin: 48px;
  `,
};

export function Layout({ sidebarSlot, contentSlot }: Props): JSX.Element {
  return (
    <elements.container>
      <elements.sidebar>{sidebarSlot}</elements.sidebar>
      <elements.content>{contentSlot}</elements.content>
    </elements.container>
  );
}
