import DashboardScreen from '../dashboard/DashboardViewContainer';
import ReceiptInputScreen from '../receiptInput/ReceiptInputView';
import GridsScreen from '../grids/GridsViewContainer';
import PagesScreen from '../pages/PagesViewContainer';
import ComponentsScreen from '../components/ComponentsViewContainer';
import SearchScreen from '../search/SearchViewContainer';

const iconHome = require('../../../assets/images/tabbar/home.png');
const iconCalendar = require('../../../assets/images/tabbar/calendar.png');
const iconGrids = require('../../../assets/images/tabbar/grids.png');
const iconPages = require('../../../assets/images/tabbar/pages.png');
const iconComponents = require('../../../assets/images/tabbar/components.png');

const tabNavigationData = [
  {
    name: 'Dashboard',
    component: DashboardScreen,
    icon: iconHome,
  },
  {
    name: 'Scanner',
    component: ReceiptInputScreen,
    icon: iconCalendar,
  },
  {
    name: 'Search',
    component: SearchScreen,
    icon: iconGrids,
  },
  {
    name: 'History',
    component: PagesScreen,
    icon: iconPages,
  },
  {
    name: 'Starred',
    component: ComponentsScreen,
    icon: iconComponents,
  },
];

export default tabNavigationData;