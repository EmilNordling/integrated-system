import styled from 'styled-components';
import { AppController } from '@controllers/app.controller';
import { usePresentation } from '@modules/presentation/use_presentation';
import type { SpaceUnwrappedEntryApiModel } from '@api/models/space_unwrapped_entry_api_model';
import { Icon } from '@components/icon.component';
import { NavLink } from 'react-router-dom';
import { FocusRing } from 'react-focus-rings';

interface Props {
  controller: AppController;
}

const elements = {
  container: styled.ul`
    width: 100%;
  `,
  item: styled(NavLink)`
    min-height: 35px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    color: #666666;
    transition: color 150ms ease-out, background 50ms ease-out;
    border-radius: 13px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.2;

    &.active {
      color: #000;
    }

    &:hover:not(.active) {
      color: #181718;
      background: #fafafa;
    }

    .inner {
      display: flex;
      align-items: center;
      line-height: 23px;
    }

    span {
      text-transform: capitalize;
      margin-left: 23px;
    }
  `,
};

function retrieveIcon(iconIndex: string): JSX.Element {
  const IconComponent = Icon[iconIndex as keyof typeof Icon] ?? Icon['eva_alert'];

  return <IconComponent />;
}

function Item({ model }: { model: SpaceUnwrappedEntryApiModel }): JSX.Element {
  return (
    <FocusRing>
      <elements.item to={`./${model.routeTo}`} end={true} caseSensitive={false}>
        <div className="inner">
          {retrieveIcon(model.icon)}
          <span>{model.title}</span>
        </div>
      </elements.item>
    </FocusRing>
  );
}

export function Sidebar({ controller }: Props): JSX.Element {
  const presentation = usePresentation(controller.presentation);

  return (
    <elements.container>
      {presentation.routes.map((x) => (
        <Item key={x.id} model={x} />
      ))}
    </elements.container>
  );
}
