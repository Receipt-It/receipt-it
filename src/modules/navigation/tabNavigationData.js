import DashboardScreen from '../dashboard/DashboardViewContainer';
import ReceiptInputScreen from '../receiptInput/ReceiptInputViewContainer';
import ReceiptHistoryScreen from '../receiptHistory/ReceiptHistoryViewContainer';
import GalleryScreen from '../gallery/GalleryViewContainer';
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
    component: ReceiptHistoryScreen,
    icon: iconPages,
  },
  {
    name: 'Starred',
    component: GalleryScreen,
    icon: iconComponents,
  },
];

export default tabNavigationData;