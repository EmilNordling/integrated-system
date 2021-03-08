import { Fragment, Children } from 'react';

export function unwrapFragment(children: React.ReactNode): React.ReactElement[] {
  const childArray = Children.toArray(children) as React.ReactElement[];

  const newArray: React.ReactElement[] = childArray.reduce<React.ReactElement[]>((builder, child) => {
    if (child.type === Fragment) {
      return builder.concat(unwrapFragment(child.props.children));
    }

    builder.push(child);

    return builder;
  }, []);

  return newArray;
}
