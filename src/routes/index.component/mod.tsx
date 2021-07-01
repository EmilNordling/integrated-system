import { NavLink } from 'react-router-dom';

interface Props {}

export function Index(_: Props): JSX.Element {
  return <NavLink to="/app">go to app</NavLink>;
}
