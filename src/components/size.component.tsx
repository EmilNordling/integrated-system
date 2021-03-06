import styled from 'styled-components';

export interface SizeProps {
  className?: string;
  fluid?: boolean;
  children?: JSX.Element | JSX.Element[];
}

const elements = {
  fluid: styled.span`
    position: relative;
    display: inline-block;
    width: 100%;
    & > * {
      width: 100%;
    }
  `,
};

export function Size({ children, className, fluid = false }: SizeProps): JSX.Element {
  if (fluid) {
    return <elements.fluid className={className}>{children}</elements.fluid>;
  }

  return <span className={className}>{children}</span>;
}
