import { useService } from 'one-atom';
import { useEffect } from 'react';
import { AppsController } from '../../application/controllers/apps.controller';
import { addDashboardStyle } from '../../modules/add_dashboard_style';

interface Props {}

// const elements = {};

export function Apps(_: Props): JSX.Element {
  const controller = useService(AppsController);

  useEffect(() => {
    return addDashboardStyle();
  }, []);

  return <div>qwe</div>;
}
