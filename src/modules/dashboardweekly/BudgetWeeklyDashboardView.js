import React, { useState } from 'react';
import { VictoryPie, VictoryLegend } from 'victory-native';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import { Card } from 'react-native-elements';
import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';

const galleryIcon = require('../../../assets/images/pages/gallery.png');

export default function BudgetWeeklyDashboardScreen(props) {

  const [Grocery, setGrocery] = useState(["Grocery", determineTotalGrocery(Object.values(props.budget))]);

  const [Food, setFood] = useState(["Food", determineTotalFood(Object.values(props.budget))]);

  const [Clothes, setClothes] = useState(["Clothes", determineTotalClothes(Object.values(props.budget))]);

  const [totalBudget, setTotalBudget] = useState(determineTotalBudget(Object.values(props.budget)));

  function determineTotalBudget(data) {
    console.log(data);
    if (data.length == 0) {
            return 1;
    }
    const total = ((parseInt(data[0].grocery) + parseInt(data[0].food) + parseInt(data[0].clothes))/4).toFixed(2);
    return total;
  }

  function determineTotalFood(data) {
    if (data.length == 0) {
        return 1;
    }
    return (data[0].food/4).toFixed(2);
  }
  function determineTotalGrocery(data) {
      if (data.length == 0) {
          return 1;
      }
      return (data[0].grocery/4).toFixed(2);
  }
  function determineTotalClothes(data) {
      if (data.length == 0) {
          return 1;
      }
      return (data[0].clothes/4).toFixed(2);
  }

  return (
    <View style={styles.container}>
        <View style={styles.section}>
          <Text size={30} bold black style={styles.dashboardTitle}>${totalBudget}</Text>
                                      <Text style={styles.dashboardTitle}>Weekly Budget</Text>
          <VictoryPie
                    colorScale={["#F19820", "#03989E", "#EDCFC5"]}
                    padAngle={2}
                    labels={() => null}
                    innerRadius={100}
                      data={[
                        { x: Grocery[0], y: Grocery[1] },
                        { x: Food[0], y: Food[1] },
                        { x: Clothes[0], y: Clothes[1] }
                      ]}
                    />
        </View>
        <View style={styles.description}>
                  <Text size={20} style={styles.title}>
                      Weekly budget by category
                  </Text>
                  <View style={styles.row}>
                  <View style={styles.rowItem}>
                  <VictoryLegend x={25} y={25}
                    orientation="vertical"
                    gutter={20}
                    rowGutter={{ top: 0, bottom: 3 }}
                    data={[
                        { name: `${Grocery[0]} $${Grocery[1]}`, symbol: { fill: "#F19820" }, labels: { fill: "black" }  },
                        { name: `${Food[0]} $${Food[1]}`, symbol: { fill: "#03989E" }, labels: { fill: "black" }  },
                        { name: `${Clothes[0]} $${Clothes[1]}`, symbol: { fill: "#EDCFC5" }, labels: { fill: "black" }  }
                      ]}
                  />
                  </View>
                  </View>
         </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 120,
    paddingVertical: 20,
    borderColor: colors.primaryLight,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 5,
  },
  itemImage: {
    height: 35,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingTop: 20,
    flexDirection: "column",
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  section: {
    paddingTop: 50,
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionLarge: {
    flex: 2,
    justifyContent: 'space-around',
  },
  sectionHeader: {
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: 'center',
  },
  description: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 135,
    elevation: 20,
    shadowColor: '#52006A',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
  },
  titleDescription: {
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  dashboardTitle: {
       top: 230,
     },
  title: {
    marginTop: 150,
    color: 'black',
  },
  categories: {
      left: -100,
    },
  price: {
    marginBottom: 5,
  },
  priceLink: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  row: {
    flexDirection: 'row',
  },
  rowItem: {
    flex: 1,
  },
  pBarStyle: {
    marginTop: 30,
    flex: 1,
  },
  pBarItem: {
    marginTop: 18,
  }
});
