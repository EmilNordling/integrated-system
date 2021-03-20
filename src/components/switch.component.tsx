import styled from 'styled-components';
import { ChangeEvent, forwardRef, KeyboardEvent, SyntheticEvent, useLayoutEffect, useRef, useState } from 'react';
import { BaseInput } from './base_input.component';
import { FocusRing } from 'react-focus-rings';
import { useCombinedRefs } from '@modules/use_combined_ref';

interface Props {
  name?: string;
  id?: string;
  tabIndex?: number;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (newValue: boolean, event: SyntheticEvent<HTMLInputElement>) => void;
}

const elements = {
  container: styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 40px;
    height: 24px;
    border-radius: 14px;
    background-color: #5a5a5a;
    transition: background-color 0.3s, filter 0.3s;

    &.checked {
      background-color: #0099ff;

      .ellipse {
        transform: translateX(calc(100% - 10px));
      }
    }

    &.headingToLeft,
    &.headingToRight {
      background-color: #366381;
    }

    &.headingToLeft {
      .ellipse {
        transform: translateX(calc(100% - 15px));
      }
    }

    &.headingToRight {
      .ellipse {
        transform: translateX(5px);
      }
    }

    .ellipse {
      left: -1px;
      position: absolute;
      fill: #fff;
      width: 26px;
      height: 26px;
      pointer-events: none;
      stroke: none;
      stroke-width: 0;
      stroke-linecap: round;
      stroke-linejoin: round;
      display: block;
      transition: fill 0.3s, transform 0.3s;
      filter: drop-shadow(0 0.5px 0.5px rgba(0, 0, 0, 0.3));
    }

    &:hover:not(:disabled):not(.headingToLeft):not(.headingToRight),
    &:focus:not(:disabled):not(.headingToLeft):not(.headingToRight) {
      filter: brightness(115%) hue-rotate(3deg);
    }
  `,
  actualInput: styled(BaseInput)`
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
  `,
};

export const Switch = forwardRef<HTMLInputElement, Props>(function Switch(
  { id, tabIndex = -1, checked: _checked, disabled, onChange, name },
  ref,
) {
  const innerRef = useRef<HTMLInputElement>(null);
  const combinedRef = useCombinedRefs(ref, innerRef);
  const [checked, setChecked] = useState(_checked ?? false);
  const [willCommit, setWillCommit] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    if (event.nativeEvent.defaultPrevented) {
      return;
    }

    const newValue = event.target.checked;
    setChecked(newValue);
    setWillCommit(false);

    if (onChange) {
      onChange(newValue, event);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    if (event.key === 'Enter') {
      setChecked(!checked);

      event.preventDefault();
    }
  }

  function handleMouseDown(): void {
    setWillCommit(true);
  }

  function handleMouseOut(): void {
    setWillCommit(false);
  }

  // Value correction for useForm input
  useLayoutEffect(() => {
    if (combinedRef.current) {
      if (combinedRef.current.checked !== checked) {
        setChecked(combinedRef.current.checked);
      }
    }
  }, []);

  return (
    <FocusRing enabled={tabIndex !== -1} offset={-2}>
      <elements.container
        data-testid="switch-container"
        className={`${checked ? 'checked' : ''} ${willCommit ? (checked ? 'headingToLeft' : 'headingToRight') : ''}`}
        tabIndex={tabIndex}
        onKeyDown={handleKeyDown}
      >
        <svg className="ellipse" viewBox="0 0 28 28">
          <path d="M24.5 14C24.5 19.799 19.799 24.5 14 24.5C8.20101 24.5 3.5 19.799 3.5 14C3.5 8.20101 8.20101 3.5 14 3.5C19.799 3.5 24.5 8.20101 24.5 14Z" />
        </svg>
        <elements.actualInput
          name={name}
          ref={combinedRef}
          disabled={disabled}
          checked={checked}
          onChange={handleChange}
          onMouseOut={handleMouseOut}
          onMouseDown={handleMouseDown}
          id={id}
          type="checkbox"
          tabIndex={0}
        />
      </elements.container>
    </FocusRing>
  );
});
