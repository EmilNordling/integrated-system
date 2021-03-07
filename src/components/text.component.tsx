import styled from 'styled-components';

interface Props {
  children: string;
}

const elements = {
  p: styled.p`
    line-height: 1.5;
    font-size: 1rem;
  `,
  h2: styled.h1`
    line-height: 1.5;
    font-size: 1.25rem;
    letter-spacing: -0.5px;
    font-weight: bold;
  `,
};

export function Text({ children }: Props): JSX.Element {
  return <elements.p>{children}</elements.p>;
}
Text.header = function Text_Header({ children }: Props): JSX.Element {
  return <elements.h2>{children}</elements.h2>;
};
