import { render } from '@testing-library/react';
import { HStack } from './h_stack.component';

test('asserts that parent gets className applied', () => {
  const { container } = render(
    <HStack>
      <div>test</div>
    </HStack>,
  );

  expect(container.querySelectorAll('.p_0_y_h_c_0_y_h_l_1').length).toBe(1);
});

test('asserts that spacing prop gets applied', () => {
  const { container } = render(
    <HStack spacing={10}>
      <div>test</div>
    </HStack>,
  );

  expect(container.querySelectorAll('.p_10_y_h_c_10_y_h_l_1').length).toBe(1);
});
