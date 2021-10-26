import React from 'react';
import { VictoryPie, VictoryLegend } from 'victory-native';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';

export default function DashboardScreen({ isExtended, setIsExtended }) {
  // const rnsUrl = 'https://reactnativestarter.com';
  // const handleClick = () => {
  //   Linking.canOpenURL(rnsUrl).then(supported => {
  //     if (supported) {
  //       Linking.openURL(rnsUrl);
  //     } else {
  //       console.log(`Don't know how to open URI: ${rnsUrl}`);
  //     }
  //   });
  // };

  return (
    <View style={styles.container}>
        <View style={styles.section}>
          <Text size={30} bold black style={styles.dashboardTitle}>
            Dashboard
          </Text>
          <VictoryPie
                    colorScale={["gold", "cyan", "navy"]}
                    labels={() => null}
                    innerRadius={50}
                      data={[
                        { x: "Food", y: 35 },
                        { x: "Entertainment", y: 40 },
                        { x: "Necessities", y: 55 }
                      ]}
                    />
        </View>
        <View style={styles.description}>
                  <Text size={20} style={styles.title}>
                    Total expenses: $100.00
                  </Text>
                  <VictoryLegend x={25} y={25}
                    orientation="vertical"
                    gutter={20}
                    rowGutter={{ top: 0, bottom: 3 }}
                    data={[
                        { name: "Groceries", symbol: { fill: "gold" }, labels: { fill: "black" }  },
                        { name: "Entertainment", symbol: { fill: "cyan" }, labels: { fill: "black" }  },
                        { name: "Transportation", symbol: { fill: "navy" }, labels: { fill: "black" }  }
                      ]}
                  />
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
});
