import styled from 'styled-components';
import { AppController } from '@controllers/app.controller';
import { usePresentation } from '@modules/presentation/use_presentation';
import { Text } from '@components/text.component';

interface Props {
  controller: AppController;
}

const elements = {
  container: styled.ul`
    width: 100%;
  `,
};

export function Content({ controller }: Props): JSX.Element {
  const _ = usePresentation(controller.presentation);

  return (
    <elements.container>
      <Text.header>content</Text.header>
    </elements.container>
  );
}
