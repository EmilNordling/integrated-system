import { useEffect } from 'react';
import { addDashboardStyle } from '@modules/add_dashboard_style';

interface Props {}

// const elements = {};

export function Home(_: Props): JSX.Element {
  useEffect(() => {
    return addDashboardStyle();
  }, []);

  return <div>home</div>;
}
