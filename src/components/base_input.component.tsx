import { useState, InputHTMLAttributes, forwardRef } from 'react';
import { FocusRing } from 'react-focus-rings';
import styled from 'styled-components';

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: any;
  className?: string;
  type?:
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
}

const elements = {
  baseInput: styled.input`
    display: block;
    font: inherit;
    color: currentColor;
    border: 0;
    margin: 0;
    padding: 6px 0 7px;
    display: block;
    min-width: 0;
    box-sizing: content-box;
    background: none;
    -webkit-tap-highlight-color: transparent;
    outline: none;
    color: var(--input-subtle, #333);

    &:focus:not(:disabled) {
      color: var(--input-clr, #333);
    }
  `,
};

export const BaseInput: FC<BaseInputProps> = forwardRef(function _BaseInput(props, ref) {
  const {
    // Takes out these values to be used as variables here.
    className,
    disabled,
    type,
    // defaults.
    tabIndex = 0,
    // Spreads anything else.
    ...rest
  } = props;

  const [isFocused, setIsFocus] = useState(false);

  if (disabled && isFocused) setIsFocus(false);

  return (
    <FocusRing offset={-1}>
      <elements.baseInput
        ref={ref}
        aria-invalid={true}
        aria-describedby={''}
        className={className}
        disabled={disabled}
        tabIndex={disabled ? -1 : tabIndex}
        type={type ?? 'text'}
        {...rest}
      />
    </FocusRing>
  );
});
