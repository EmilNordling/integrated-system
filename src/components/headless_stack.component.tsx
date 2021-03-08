import { StyleSheetController } from '@modules/style_sheet_controller';

interface HeadLessProps {
  parentClassName: string;
}
export type HeadlessStackAxis = 'Vertical' | 'Horizontal';

export interface HeadlessStackProps {
  spacing: number;
  axis: HeadlessStackAxis;
  fluid: boolean;
  childLength: number;
}

interface InternalProps extends HeadlessStackProps {
  children: (props: HeadLessProps) => JSX.Element;
}

const style_sheet_controller = new StyleSheetController();

export function HeadLessStack({ axis, fluid, spacing, childLength, children }: InternalProps): JSX.Element {
  const halfSpacing = spacing / 2;
  const baseStr = `${spacing}_${fluid ? 'y' : 'n'}_${axis === 'Vertical' ? 'v' : 'h'}`;
  const childClassName = `c_${baseStr}${childLength !== 0 ? `_l_${childLength}` : ''}`;
  const parentClassName = `p_${baseStr}_${childClassName}`;

  if (axis === 'Vertical') {
    style_sheet_controller
      .addToRegister(
        `.${parentClassName}`,
        `
          display: flex;
          ${fluid ? `height: calc(100% + ${spacing}px);` : ''}
          flex-direction: column;
          margin-top: -${halfSpacing}px!important;
          margin-bottom: -${halfSpacing}px!important;
        `,
      )
      .addToRegister(
        `.${parentClassName} > *`,
        `
          ${fluid ? `height: calc(${childLength !== 0 ? 100 / childLength : 100}% - ${spacing}px)!important;` : ''}
          margin-top: ${halfSpacing}px!important;
          margin-bottom: ${halfSpacing}px!important;
    `,
      );
  } else {
    style_sheet_controller
      .addToRegister(
        `.${parentClassName}`,
        `
          display: flex;
          ${fluid ? `width: calc(100% + ${spacing}px);` : ''}
          flex-direction: row;
          margin-left: -${halfSpacing}px!important;
          margin-right: -${halfSpacing}px!important;
      `,
      )
      .addToRegister(
        `.${parentClassName} > *`,
        `
          ${fluid ? `width: calc(${childLength !== 0 ? 100 / childLength : 100}% - ${spacing}px)!important;` : ''}
          margin-left: ${halfSpacing}px!important;
          margin-right: ${halfSpacing}px!important;
    `,
      );
  }

  return children({
    parentClassName: parentClassName,
  });
}
