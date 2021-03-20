import styled from 'styled-components';
import { Switch } from '@components/switch.component';
import { HStack } from '@components/h_stack.component';
import { VStack } from '@components/v_stack.component';

interface Props {}

const elements = {
  container: styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    background: #fbfbfb;
  `,
  leftSide: styled.div`
    flex: 1;
    padding: 10px;
  `,
  rightSide: styled.div`
    width: 250px;
    border-left: 1px solid var(--global-border);
    background: var(--global-foreground);
  `,
};

export function Editor(_: Props): JSX.Element {
  return (
    <elements.container>
      <elements.leftSide>
        <VStack fluid={false} spacing={10}>
          <Switch />
          <Switch />
          <Switch />
          <Switch />
          <Switch />
          <Switch />
        </VStack>
      </elements.leftSide>
      <elements.rightSide>qwe</elements.rightSide>
    </elements.container>
  );
}
