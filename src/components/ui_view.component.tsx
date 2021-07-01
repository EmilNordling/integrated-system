import { ViewStackModel } from '@controllers/ui_bindings.controller/views.controller';
import { Fragment, useRef } from 'react';

interface Props {
  model: ViewStackModel;
}

export function UIView({ model }: Props): JSX.Element {
  // const Component = useMemo(() => {
  //   return model.jsxComponent;
  // }, []);
  // const componentRef = useRef<JSX.Element>();
  // if (componentRef.current == null) {
  //   componentRef.current = model.jsxComponent();
  // }

  console.log(model);

  return <model.jsxComponent />;
}
