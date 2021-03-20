import { fireEvent, render } from '@testing-library/react';
import { formControl } from './form_control';
import { useForm } from './mod';

function Component({ cb }: any): JSX.Element {
  const { set, forward } = useForm(() => ({
    test: formControl('initial'),
  }));

  const handleSubmit = forward((data) => {
    cb(data);
  });

  return (
    <form onSubmit={handleSubmit}>
      <input data-testid="input" name="test" ref={set} />
      <button data-testid="button" type="submit">
        submit
      </button>
    </form>
  );
}

test('asserts', async (done) => {
  const { getByTestId } = render(
    <Component
      cb={(data: any) => {
        expect(data.test).toEqual('changed');

        done();
      }}
    />,
  );

  const input = getByTestId('input');
  fireEvent.input(input, { target: { value: 'changed' } });
  // @ts-ignore

  const button = getByTestId('button');
  fireEvent.click(button);
});
