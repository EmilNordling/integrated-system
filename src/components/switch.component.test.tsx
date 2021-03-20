import { fireEvent, render } from '@testing-library/react';
import { Switch } from './switch.component';

test('asserts that input get checked', async () => {
  const { getByRole } = render(<Switch />);
  const input = getByRole('checkbox') as HTMLInputElement;
  expect(input.checked).toBe(false);

  fireEvent(
    input,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );

  expect(input.checked).toBe(true);
});

test('asserts that input get checked through keyboard', async () => {
  const { getByRole, getByTestId } = render(<Switch />);
  const input = getByRole('checkbox') as HTMLInputElement;
  expect(input.checked).toBe(false);

  fireEvent.keyDown(getByTestId('switch-container'), { key: 'Enter', code: 'Enter' });

  expect(input.checked).toBe(true);
});
