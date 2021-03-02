import { useRef } from 'react';
import styled from 'styled-components';
import { Routes } from './routes.component';
import { FocusRingScope } from 'react-focus-rings';

interface Props {}

const elements = {
  container: styled.div`
    display: contents;
  `,
};

export function App(_: Props): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <elements.container ref={containerRef}>
      <FocusRingScope containerRef={containerRef}>
        <Routes />
      </FocusRingScope>
    </elements.container>
  );
}
