import styled from 'styled-components';
import { BaseButton, BaseButtonProps } from './base_button.component/mod';
import { SizeProps, Size } from './size.component';

export interface ButtonProps extends BaseButtonProps, SizeProps {
  round?: boolean;
}

const elements = {
  content: styled.div`
    display: contents;

    --focus-primary: red;
  `,
  actionButton: styled(BaseButton)`
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
    transition: filter 0.3s ease;
    color: var(--button-action-clr, #ffffff) !important;
    background: var(--button-action-bg, #0099ff) !important;

    &.round {
      font-size: 13px;
      padding: 0;
    }

    &:hover:not(:disabled),
    &:focus:not(:disabled) {
      filter: brightness(115%) hue-rotate(3deg);
    }

    &:active:not(:disabled) {
      filter: brightness(95%) hue-rotate(3deg);
    }
  `,
};

export function Button({ children, fluid, className, round, ...rest }: ButtonProps): JSX.Element {
  const _className = `${className ?? ''} ${round ? 'round' : ''}`;

  return (
    <elements.content>
      <Size fluid={fluid}>
        <elements.actionButton className={_className} {...rest}>
          {children}
        </elements.actionButton>
      </Size>
    </elements.content>
  );
}
