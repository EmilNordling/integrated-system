import { Fragment } from 'react';
import { usePresentation } from '@modules/presentation/use_presentation';
import { FocusRing } from 'react-focus-rings';
import { NavLink } from 'react-router-dom';
import { SurfaceApi } from '../../application/surface_api';
import { styled } from '@stitches/react';
import { ContextMenu } from '@components/context_menu.component';
import type { SyntheticEvent } from 'react';
import type { ViewStackModel } from '@controllers/ui_bindings.controller/views.controller';
import * as Radix_ContextMenu from '@radix-ui/react-context-menu';

interface Props {}

const S_Nav = styled('nav', {
  flex: 1,
  padding: '15px 15px 0',
});

const S_Item = styled(NavLink, {
  minHeight: '35px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 8px',
  color: '#666666',
  transition: 'color 150ms ease-out, background 50ms ease-out',
  borderRadius: '13px',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: 1.2,

  '&.active': {
    color: '#0099ff',
  },
  '&:hover:not(.active)': {
    color: '#181718',
    background: '#fafafa',
  },

  span: {
    textTransform: 'capitalize',
    marginLeft: '23px',
  },
});

const S_Inner = styled('div', {
  display: 'flex',
  alignItems: 'center',
  lineHeight: '23px',
});

function retrieveIcon(_: string): JSX.Element {
  // TODO: https://github.com/antfu/vite-plugin-icons
  return <Fragment />;
}

function LLink({ model }: { model: ViewStackModel }): JSX.Element {
  function handleClick(event: SyntheticEvent<HTMLAnchorElement>): void {
    // Disables blur on mouse down (looks nicer)
    event.preventDefault();
  }

  return (
    <Radix_ContextMenu.Root>
      <Radix_ContextMenu.Trigger>
        <FocusRing>
          <S_Item onMouseDown={handleClick} to={`./${model.routeTo}`} end={true} caseSensitive={false}>
            <S_Inner>
              {retrieveIcon(model.icon ?? 'eva_alert')}
              <span>{model.title}</span>
            </S_Inner>
          </S_Item>
        </FocusRing>
      </Radix_ContextMenu.Trigger>

      <ContextMenu />
    </Radix_ContextMenu.Root>
  );
}

export function Nav(_: Props): JSX.Element {
  const presentation = usePresentation(SurfaceApi.ui.views.routes);

  return (
    <S_Nav>
      {presentation.routes
        .filter((route) => route.listable)
        .map((route) => (
          <LLink key={route.id} model={route} />
        ))}
    </S_Nav>
  );
}
