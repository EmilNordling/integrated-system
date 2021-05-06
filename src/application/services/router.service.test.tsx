import { render, screen } from '@testing-library/react';
import { RDI } from '@modules/rdi/mod';
import { Route, Router, Routes } from 'react-router';
import { RouterService } from './router.service';

test('asserts that navigation should fail if no history if provided', () => {
  const routerService = RDI.resolve(RouterService);

  expect(() => routerService.navigate('here')).toThrow();
});

test('that navigation should work in a test environment', () => {
  const routerService = RDI.resolve(RouterService);
  const history = routerService.createMemoryHistory();
  history.push('/sign-in');

  const _ = render(
    <Router navigator={history} location={history.location}>
      <Routes>
        <Route path="/">
          <div>bad route</div>
        </Route>
        <Route path="/sign-in">
          <div>good route</div>
        </Route>
      </Routes>
    </Router>,
  );

  expect(screen.getByText('good route')).toBeInTheDocument();
});
