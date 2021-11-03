import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import { colors, fonts } from '../../styles';

const chartIcon = require('../../../assets/images/pages/chart.png');
const calendarIcon = require('../../../assets/images/pages/calendar.png');
const chatIcon = require('../../../assets/images/pages/chat.png');
const galleryIcon = require('../../../assets/images/pages/gallery.png');
const profileIcon = require('../../../assets/images/pages/profile.png');
const loginIcon = require('../../../assets/images/pages/login.png');
const blogIcon = require('../../../assets/images/pages/blog.png');
const monthIcon = require('../../../assets/images/calendar-month-outline.png');
const weekIcon = require('../../../assets/images/calendar-week.png');
const dayIcon = require('../../../assets/images/calendar-today.png');
const editIcon = require('../../../assets/images/circle-edit-outline.png');

export default function BudgetDashboardMainScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('BudgetMonthly')}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={monthIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Monthly Budget</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('BudgetWeekly')}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={weekIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Weekly Budget</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('BudgetDaily')}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={dayIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Daily Budget</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('BudgetInput')}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={editIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Edit Budget</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  item: {
    flex: 1,
    height: 120,
    paddingVertical: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 5,
  },
  blogItem: {
    width: '31%',
    height: 120,
    paddingVertical: 20,
    borderColor: colors.primaryLight,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 5,
  },
  itemText: {
    color: 'black',
    fontFamily: fonts.primary,
  },
  itemImage: {
    height: 35,
  },
});
