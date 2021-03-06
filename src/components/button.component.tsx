import styled from 'styled-components';
import { BaseButton, OneAtomBaseButtonProps } from './base_button.component';
import { SizeProps, Size } from './size.component';

export interface ButtonProps extends OneAtomBaseButtonProps, SizeProps {
  round?: boolean;
  children?: JSX.Element | JSX.Element[];
}

const elementsShared = {
  button: styled(BaseButton)`
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 30px;
    min-width: 30px;
    font-weight: 700;
    padding: 0px 14px;
    box-sizing: border-box;
    font-size: 0.8125rem; // 13px
    transition: background-color 0.3s ease;

    &.round {
      font-size: 16px;
      padding: 0;
    }
  `,
};

const elements = {
  actionButton: styled(elementsShared.button)`
    color: var(--oa-button-action-clr, #ffffff);
    background: var(--oa-button-action-bg, #333333);

    &:hover:not(:disabled) {
      filter: brightness(90%) hue-rotate(2deg);
    }

    &:active:not(:disabled) {
      filter: brightness(80%) hue-rotate(2deg);
    }
  `,
};

export function Button({ children, fluid, className, round, ...rest }: ButtonProps): JSX.Element {
  const _className = `${className ?? ''} ${round ? 'round' : ''}`;

  return (
    <Size fluid={fluid}>
      <elements.actionButton className={_className} {...rest}>
        {children}
      </elements.actionButton>
    </Size>
  );
}
