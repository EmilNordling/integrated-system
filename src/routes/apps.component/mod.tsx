import { useEffect } from 'react';
import { AppsController } from '@controllers/apps.controller';
import { addDashboardStyle } from '@modules/add_dashboard_style';
import { useService } from '@modules/rdi/use_service';

interface Props {}

// const elements = {};

export function Apps(_: Props): JSX.Element {
  const controller = useService(AppsController);

  useEffect(() => {
    return addDashboardStyle();
  }, []);

  return <div>qwe</div>;
}
