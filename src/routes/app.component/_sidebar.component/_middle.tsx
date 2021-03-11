import styled from 'styled-components';
import { SpaceUnwrappedEntryApiModel } from '@api/models/space_unwrapped_entry_api_model';
import { AppController } from '@controllers/app.controller';
import { Icon } from '@components/icon.component';
import { usePresentation } from '@modules/presentation/use_presentation';
import { FocusRing } from 'react-focus-rings';
import { NavLink } from 'react-router-dom';
import type { SyntheticEvent } from 'react';

const elements = {
  middle: styled.div`
    flex: 1;
    padding: 15px 15px 0;
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
      color: #0099ff;
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
  function handleClick(event: SyntheticEvent<HTMLAnchorElement>): void {
    // Disables blur on mouse down (looks nicer)
    event.preventDefault();
  }

  return (
    <FocusRing>
      <elements.item onMouseDown={handleClick} to={`./${model.routeTo}`} end={true} caseSensitive={false}>
        <div className="inner">
          {retrieveIcon(model.icon)}
          <span>{model.title}</span>
        </div>
      </elements.item>
    </FocusRing>
  );
}

export function Middle({ controller }: { controller: AppController }): JSX.Element {
  const presentation = usePresentation(controller.presentation);

  return (
    <elements.middle>
      {presentation.routes.map((x) => (
        <Item key={x.id} model={x} />
      ))}
    </elements.middle>
  );
}
