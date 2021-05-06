import { styled } from '@stitches/react';
import * as RadixContextMenu from '@radix-ui/react-context-menu';

const S_Container = styled(RadixContextMenu.Content, {
  minWidth: 130,
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 5,
  boxShadow: '0 1px 0 rgba(0, 0, 0, 0.05), 0 4px 10px rgba(0, 0, 0, 0.1)',
});

const S_Item = styled(RadixContextMenu.Item, {
  fontSize: 12,
  padding: '4px 10px',
  borderRadius: 6,
  cursor: 'default',

  '&:focus': {
    outline: 'none',
    backgroundColor: '#09f',
    color: '#fff',
  },
});

export function ContextMenu(): JSX.Element {
  return (
    <S_Container alignOffset={-5}>
      <S_Item onSelect={() => console.log('cut')}>Cut</S_Item>
      <S_Item onSelect={() => console.log('copy')}>Copy</S_Item>
      <S_Item onSelect={() => console.log('paste')}>Paste</S_Item>
    </S_Container>
  );
}
