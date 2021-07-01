import { useLayoutEffect } from 'react';
import { addDashboardStyle } from './add_dashboard_style';

export function useDashboardStyle(): void {
  useLayoutEffect(() => {
    return addDashboardStyle();
  }, []);
}
