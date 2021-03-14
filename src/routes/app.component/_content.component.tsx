import { Text } from '@components/text.component';
import { VStack } from '@components/v_stack.component';
import { Input } from '@components/input.component';
import { Button } from '@components/button.component';
import { HStack } from '@components/h_stack.component';
import styled from 'styled-components';
import { Fragment } from 'react';
import { Editor } from 'routes/editor.component/mod';

interface Props {}

const elements = {
  navBar: styled.div`
    margin-top: 45px;
    z-index: 1;

    .navBar_space {
      height: 45px;
      box-shadow: 0 1px 0 0 #e5e5e5;
      padding-right: 20px;
      padding-left: 23px;
      top: 0;
      position: fixed;
      width: 100%;
      background: #fff;
      z-index: 0;
    }

    .navBar_inner {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `,
  options: styled.div`
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
  `,
  view: styled.div`
    z-index: 0;
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
  `,
};

function Test(): JSX.Element {
  return (
    <VStack fluid={false} spacing={15}>
      <Text.header>content</Text.header>

      <HStack fluid={false} spacing={15}>
        <Input fluid={false} />
        <Input fluid={false} />
      </HStack>

      <HStack fluid={false} spacing={15}>
        <Input fluid={false} />
        <Input fluid={false} />
      </HStack>

      <HStack fluid={false} spacing={15}>
        <Input fluid={false} />
        <Input fluid={false} />
      </HStack>

      <Button>send</Button>
    </VStack>
  );
}

export function Content(_: Props): JSX.Element {
  return (
    <Fragment>
      <elements.navBar>
        <div className="navBar_space">
          <div className="navBar_inner">nav bar</div>
        </div>
      </elements.navBar>
      <elements.view>
        <Editor />
      </elements.view>
    </Fragment>
  );
}
