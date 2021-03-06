import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import TabNavigator from './MainTabNavigator';
import GalleryScreen from '../gallery/GalleryViewContainer';
import AvailableInFullVersion from '../../modules/availableInFullVersion/AvailableInFullVersionViewContainer';
import DashboardScreen from '../dashboard/DashboardViewContainer';
import ReceiptInputScreen from '../receiptInput/ReceiptInputViewContainer';
import ReceiptHistoryScreen from '../receiptHistory/ReceiptHistoryViewContainer';
import SearchScreen from '../search/SearchViewContainer';
import BudgetInputScreen from '../budget/BudgetInputViewContainer';
import BudgetMonthlyDashboardScreen from '../dashboardmonthly/BudgetMonthlyDashboardViewContainer';
import BudgetWeeklyDashboardScreen from '../dashboardweekly/BudgetWeeklyDashboardViewContainer';
import BudgetDailyDashboardScreen from '../dashboarddaily/BudgetDailyDashboardViewContainer';
import BudgetDashboardMainScreen from '../BudgetDashboardMain/BudgetMainViewContainer';

import { colors, fonts } from '../../styles';

const headerLeftComponent = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      <Image
        source={require('../../../assets/images/icons/arrow-back.png')}
        resizeMode="contain"
        style={{
          height: 20,
        }}
      />
    </TouchableOpacity>    
  )
}

const headerBackground = require('../../../assets/images/peachTopBarBg.png');

const StackNavigationData = [
  {
    name: 'Receipt-It',
    component: TabNavigator,
    headerLeft: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Dashboard',
    component: DashboardScreen,
    headerLeft: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Scanner',
    component: ReceiptInputScreen,
    headerLeft: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Search',
    component: SearchScreen,
    headerLeft: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'History',
    component: ReceiptHistoryScreen,
    headerLeft: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'BudgetInput',
    component: BudgetInputScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
      name: 'BudgetMonthly',
      component: BudgetMonthlyDashboardScreen,
      headerLeft: headerLeftComponent,
      headerBackground: { source: headerBackground },
      headerTitleStyle: {
        fontFamily: fonts.primaryRegular,
        color: colors.white,
        fontSize: 18,
    },
  },
  {
        name: 'BudgetWeekly',
        component: BudgetWeeklyDashboardScreen,
        headerLeft: headerLeftComponent,
        headerBackground: { source: headerBackground },
        headerTitleStyle: {
          fontFamily: fonts.primaryRegular,
          color: colors.white,
          fontSize: 18,
    },
  },
  {
          name: 'BudgetDaily',
          component: BudgetDailyDashboardScreen,
          headerLeft: headerLeftComponent,
          headerBackground: { source: headerBackground },
          headerTitleStyle: {
            fontFamily: fonts.primaryRegular,
            color: colors.white,
            fontSize: 18,
   },
  },
  {
            name: 'BudgetMain',
            component: BudgetDashboardMainScreen,
            headerLeft: headerLeftComponent,
            headerBackground: { source: headerBackground },
            headerTitleStyle: {
              fontFamily: fonts.primaryRegular,
              color: colors.white,
              fontSize: 18,
     },
    },
]

export default StackNavigationData;
