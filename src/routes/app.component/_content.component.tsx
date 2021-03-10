import { AppController } from '@controllers/app.controller';
import { usePresentation } from '@modules/presentation/use_presentation';
import { Text } from '@components/text.component';
import { VStack } from '@components/v_stack.component';
import { Input } from '@components/input.component';
import { Button } from '@components/button.component';
import { HStack } from '@components/h_stack.component';
import styled from 'styled-components';
import { Fragment } from 'react';

interface Props {
  controller: AppController;
}

const elements = {
  navBar: styled.div`
    margin-top: 45px;

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
    padding: 0 23px;
    margin-bottom: 40px;
    z-index: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
  `,
};

export function Content({ controller }: Props): JSX.Element {
  const _ = usePresentation(controller.presentation);

  return (
    <Fragment>
      <elements.navBar>
        <div className="navBar_space">
          <div className="navBar_inner">nav bar</div>
        </div>
      </elements.navBar>
      <elements.options></elements.options>
      <elements.view>
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
      </elements.view>
    </Fragment>
  );
}
