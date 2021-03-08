import { unwrapFragment } from '@modules/unwrap_fragment';
import { cloneElement, useMemo, Children } from 'react';
import { HeadLessStack, HeadlessStackProps } from './headless_stack.component';

export interface HStackProps extends Partial<Omit<HeadlessStackProps, 'axis'>> {
  className?: string;
  children: JSX.Element | JSX.Element[];
}

export function HStack({ className, spacing = 0, fluid = true, children }: HStackProps): JSX.Element {
  const flatten = unwrapFragment(children);
  const childLength = useMemo(() => Children.count(children), [children]);

  return (
    <HeadLessStack spacing={spacing} axis={'Horizontal'} fluid={fluid} childLength={childLength}>
      {({ parentClassName }) => (
        <div className={`${className ?? ''} ${parentClassName}`.trim()}>
          {flatten.map((child) => {
            if (child === null) return child;

            return cloneElement(child, {
              ...child.props,
              className: `${child.props.className ?? ''}`.trim(),
            });
          })}
        </div>
      )}
    </HeadLessStack>
  );
}
