import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { 
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import NavigatorView from './RootNavigation';

import AvailableInFullVersion from '../../modules/availableInFullVersion/AvailableInFullVersionViewContainer';

const iconHome = require('../../../assets/images/drawer/home.png');
const iconCalendar = require('../../../assets/images/drawer/calendar.png');
const iconGrids = require('../../../assets/images/drawer/grids.png');
const iconPages = require('../../../assets/images/drawer/pages.png');
const iconComponents = require('../../../assets/images/drawer/components.png');
const iconSettings = require('../../../assets/images/drawer/settings.png');
const iconBlog = require('../../../assets/images/drawer/blog.png');

const iconDashboard = require('../../../assets/images/drawer/chart-bar-white.png');
const iconScanner = require('../../../assets/images/drawer/camera-white.png');
const iconSearch = require('../../../assets/images/drawer/magnify-white.png');
const iconHistory = require('../../../assets/images/drawer/clipboard-text-clock.png');
const iconBudget = require('../../../assets/images/drawer/currency-usd.png');

const iconBudgetD = require('../../../assets/images/drawer/budget-daily.png');
const iconBudgetW = require('../../../assets/images/drawer/budget-week.png');
const iconBudgetM = require('../../../assets/images/drawer/calendar-month.png');
const iconBudgetE = require('../../../assets/images/drawer/edit-outline.png');

const drawerData = [
  {
    name: 'Dashboard',
    icon: iconDashboard,
  },
  {
    name: 'Scanner',
    icon: iconScanner,
  },
  {
    name: 'Search',
    icon: iconSearch,
  },
  {
    name: 'History',
    icon: iconHistory,
  },
  {
    name: 'Budget',
    icon: iconBudget,
  },
];

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={{padding: 0}}>
      <View style={styles.avatarContainer}>
          <Text style={styles.userName}>Receipt-It</Text>
      </View>
    </DrawerContentScrollView>
  );
}

export default function App() {

  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: '#f8a494',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Homes" component={NavigatorView} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  menuTitle: {
    marginLeft: 10,
    color: '#fff'
  },
  menuLabelFlex: {
    display: 'flex',
    flexDirection: 'row'
  },
  userName: {
    color: '#fff',
    fontSize: 18
  },
  divider: {
    borderBottomColor: 'white',
    opacity: 0.2,
    borderBottomWidth: 1,
    margin: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
    marginBottom: 10
  },
});
