import DashboardScreen from '../dashboard/DashboardViewContainer';
import ReceiptInputScreen from '../receiptInput/ReceiptInputViewContainer';
import ReceiptHistoryScreen from '../receiptHistory/ReceiptHistoryViewContainer';
import GalleryScreen from '../gallery/GalleryViewContainer';
import SearchScreen from '../search/SearchViewContainer';
import BudgetInputScreen from '../budget/BudgetInputViewContainer';
import BudgetDashboardMainScreen from '../BudgetDashboardMain/BudgetMainViewContainer';

const iconHome = require('../../../assets/images/tabbar/home.png');
const iconCalendar = require('../../../assets/images/tabbar/calendar.png');
const iconGrids = require('../../../assets/images/tabbar/grids.png');
const iconPages = require('../../../assets/images/tabbar/pages.png');
const iconComponents = require('../../../assets/images/tabbar/components.png');

const iconDashboard = require('../../../assets/images/tabbar/dashboard.png');
const iconScanner = require('../../../assets/images/tabbar/scanner.png');
const iconSearch = require('../../../assets/images/tabbar/search.png');
const iconHistory = require('../../../assets/images/tabbar/history.png');
const iconBudget = require('../../../assets/images/tabbar/budget.png');

const tabNavigationData = [
  {
    name: 'Dashboard',
    component: DashboardScreen,
    icon: iconDashboard,
  },
  {
    name: 'Scanner',
    component: ReceiptInputScreen,
    icon: iconScanner,
  },
  {
    name: 'Search',
    component: SearchScreen,
    icon: iconSearch,
  },
  {
    name: 'History',
    component: ReceiptHistoryScreen,
    icon: iconHistory,
  },
  {
    name: 'Budget',
    component: BudgetDashboardMainScreen,
    icon: iconBudget,
  },
];

export default tabNavigationData;