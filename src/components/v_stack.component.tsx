import { unwrapFragment } from '@modules/unwrap_fragment';
import { cloneElement, useMemo, Children } from 'react';
import { HeadLessStack, HeadlessStackProps } from './headless_stack.component';

export interface VStackProps extends Partial<Omit<HeadlessStackProps, 'axis'>> {
  className?: string;
  children: JSX.Element | JSX.Element[];
}

export function VStack({ className, spacing = 0, fluid = true, children }: VStackProps) {
  const flatten = unwrapFragment(children);
  const childLength = useMemo(() => Children.count(children), [children]);

  return (
    <HeadLessStack spacing={spacing} axis={'Vertical'} fluid={fluid} childLength={childLength}>
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
