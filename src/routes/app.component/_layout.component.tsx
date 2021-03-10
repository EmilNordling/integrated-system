import { useDoubleClick } from '@modules/use_double_click';
import { RefObject, useEffect, useRef, useState } from 'react';
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
    grid-template-columns: auto 1fr;
  `,
  sidebar: styled.div`
    grid-area: sidebar;
    height: 100vh;
    top: 0;
    position: sticky;
    z-index: 1;

    .sidebar_fixed {
      display: flex;

      height: 100%;
      width: 100%;
      border-right: 1px solid var(--global-border);
      flex-direction: column;
      background: var(--global-foreground);
    }

    .sidebar_view {
      overflow: hidden;
      width: 100%;
      padding: 15px 15px 0;
    }
  `,
  sideBarResize: styled.div`
    position: absolute;
    width: 5px;
    top: 0;
    height: 100%;
    right: -5px;
    z-index: 10;
    cursor: ew-resize;
    padding: 0 3px;
    box-sizing: content-box;

    &.d {
      .inner {
        background-color: #0099ff;
        opacity: 1;
      }
    }

    &:hover {
      .inner {
        opacity: 1;
      }
    }

    .inner {
      width: 100%;
      height: 100%;
      background-color: #62c0ff;
      pointer-events: none;
      opacity: 0;
      transition: opacity 250ms ease, background-color 250ms ease;
    }
  `,
  content: styled.div`
    grid-area: content;
    position: relative;
    display: flex;
    overflow: auto;
    flex-direction: column;
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
  `,
};

function Resize({
  containerRef,
  min,
  max,
  initial,
  saveKey,
}: {
  containerRef: RefObject<HTMLDivElement>;
  min: number;
  max: number;
  initial: number;
  saveKey?: string;
}): JSX.Element {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      let size = `${initial}px`;
      if (saveKey) {
        size = localStorage.getItem(saveKey) || size;
      }
      containerRef.current.style.width = size;
    }
  }, [containerRef.current]);

  function handleMouseMove(e: MouseEvent): void {
    e.preventDefault();

    if (e.clientX < min || e.clientX > max) {
      return;
    }

    if (containerRef.current) {
      containerRef.current.style.width = `${e.clientX}px`;
    }
  }

  function saveSize(): void {
    if (saveKey && containerRef.current) {
      localStorage.setItem(saveKey, containerRef.current.style.width);
    }
  }

  function handleMouseUp(_: MouseEvent): void {
    saveSize();
    cleanup();
  }

  function handleMouseDown(): void {
    setIsDragging(true);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  function cleanup(): void {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }

  const [ref] = useDoubleClick(() => {
    if (containerRef.current) {
      containerRef.current.style.width = `${initial}px`;
    }

    saveSize();
    cleanup();
  });

  return (
    <elements.sideBarResize onMouseDown={handleMouseDown} className={isDragging ? 'd' : undefined} ref={ref}>
      <div className="inner" />
    </elements.sideBarResize>
  );
}

export function Layout({ sidebarSlot, contentSlot }: Props): JSX.Element {
  const sideBarRef = useRef<HTMLDivElement>(null);

  return (
    <elements.container>
      <elements.sidebar ref={sideBarRef}>
        <div className="sidebar_fixed">
          <Resize containerRef={sideBarRef} initial={280} min={100} max={600} saveKey={'__side_bar_size'} />
          <div className="sidebar_view">{sidebarSlot}</div>
        </div>
      </elements.sidebar>
      <elements.content>{contentSlot}</elements.content>
    </elements.container>
  );
}
