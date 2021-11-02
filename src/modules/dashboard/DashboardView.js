import React, { useState } from 'react';
import { VictoryPie, VictoryLegend } from 'victory-native';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import { Card } from 'react-native-elements';
import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';

export default function DashboardScreen(props) {

  const [Grocery, setGrocery] = useState(["Grocery", determineTotal(Object.values(props.receipts), "grocery")]);

  const [Food, setFood] = useState(["Food", determineTotal(Object.values(props.receipts), "food")]);

  const [Clothes, setClothes] = useState(["Clothes", determineTotal(Object.values(props.receipts), "clothes")]);

  const [TotalExpenses, setTotalExpenses] = useState(determineTotalCost(Object.values(props.receipts)));

  function determineTotal(data, category) {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].category === category) {
            total += parseInt(data[i].totalExpenses);
        }
    }
    return total;
  }

  function determineTotalCost(data) {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
        total += parseInt(data[i].totalExpenses);
    }
    return total;
  }

  return (
    <View style={styles.container}>
        <View style={styles.section}>
          <Text size={30} bold black style={styles.dashboardTitle}>
            Dashboard
          </Text>
          <VictoryPie
                    colorScale={["#F19820", "#03989E", "#EDCFC5"]}
                    labels={() => null}
                    innerRadius={50}
                      data={[
                        { x: Grocery[0], y: Grocery[1] },
                        { x: Food[0], y: Food[1] },
                        { x: Clothes[0], y: Clothes[1] }
                      ]}
                    />
        </View>
        <View style={styles.description}>
                  <Text size={20} style={styles.title}>
                    Total Expenses: ${TotalExpenses}
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
                  <View style={styles.pBarStyle}>
                  <ProgressBar
                            styleAttr="Horizontal"
                            indeterminate={false}
                            progress={0.5}
                          />
                  <View style={styles.pBarItem}>
                  <ProgressBar
                            styleAttr="Horizontal"
                            indeterminate={false}
                            progress={0.5}
                          />
                  </View>
                  <View style={styles.pBarItem}>
                  <ProgressBar
                            styleAttr="Horizontal"
                            indeterminate={false}
                            progress={0.5}
                          />
                  </View>
                  </View>

                  </View>
         </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bluish,
    paddingHorizontal: 15,
    paddingTop: 20,
    flexDirection: "column",
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  section: {
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
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginTop: 60,
    borderRadius: 5,
  },
  titleDescription: {
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  dashboardTitle: {
       top: 150,
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
