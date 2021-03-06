/* eslint-disable @typescript-eslint/no-empty-interface*/
import { forwardRef } from 'react';
import styled from 'styled-components';
import { BaseInput, OneAtomBaseInputProps } from './base_input.component';
import { Size, SizeProps } from './size.component';

export interface OneAtomInputProps extends OneAtomBaseInputProps, Omit<SizeProps, 'children'> {}

const elements = {
  label: styled.label`
    min-width: 40px;
    display: block;
    position: relative;
    box-sizing: border-box;
  `,
  input: styled(BaseInput)`
    height: 40px;
    padding: 0px 16px;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: var(--oa-input-bg, rgb(51, 51, 51));
    width: 100%;
    font-size: 0.8125rem; // 13px
    line-height: 1.05875; // 16.94px
    transition: background-color 0.3s ease;
  `,
};

export const Input: FC<OneAtomInputProps> = forwardRef(function Input({ fluid, className, ...rest }, ref) {
  return (
    <Size fluid={fluid} className={className}>
      <elements.label>
        <elements.input {...rest} ref={ref} />
      </elements.label>
    </Size>
  );
});
