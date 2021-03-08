import { render } from '@testing-library/react';
import { VStack } from './v_stack.component';

test('asserts that parent gets className applied', () => {
  const { container } = render(
    <VStack>
      <div>test</div>
    </VStack>,
  );

  expect(container.querySelectorAll('.p_0_y_v_c_0_y_v_l_1').length).toBe(1);
});

test('asserts that spacing prop gets applied', () => {
  const { container } = render(
    <VStack spacing={10}>
      <div>test</div>
    </VStack>,
  );

  expect(container.querySelectorAll('.p_10_y_v_c_10_y_v_l_1').length).toBe(1);
});
