/* eslint-disable @typescript-eslint/no-empty-interface*/
import { forwardRef } from 'react';
import styled from 'styled-components';
import { BaseInput, BaseInputProps } from './base_input.component';
import { Size, SizeProps } from './size.component';

export interface InputProps extends BaseInputProps, Omit<SizeProps, 'children'> {}

const elements = {
  label: styled.label`
    max-width: 200px;
    min-width: 40px;
    display: block;
    position: relative;
    box-sizing: border-box;
  `,
  input: styled(BaseInput)`
    height: 30px;
    padding: 0px 10px 1px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 5px;
    background-color: var(--input-bg, #f3f3f3);
    font-size: 0.8125rem; // 13px
    line-height: 1.05875; // 16.94px
    transition: background-color 0.3s ease;
  `,
};

export const Input: FC<InputProps> = forwardRef(function Input({ fluid = true, className, ...rest }, ref) {
  return (
    <Size fluid={fluid} className={className}>
      <elements.label>
        <elements.input {...rest} ref={ref} />
      </elements.label>
    </Size>
  );
});
