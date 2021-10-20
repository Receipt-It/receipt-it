import { compose, withState } from 'recompose';

import DashboardScreen from './DashboardView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  DashboardScreen,
);
