import React, { useState } from 'react';
import { VictoryPie, VictoryBar, VictoryStack, VictoryLegend } from 'victory-native';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  RefreshControl,
  Dimensions,
  Image
} from 'react-native';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import { Card, Overlay } from 'react-native-elements';
import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';

export default function DashboardScreen(props) {

  const [Grocery, setGrocery] = useState(["Grocery", determineTotal(Object.values(props.receipts), "Grocery")]);

  const [Food, setFood] = useState(["Food", determineTotal(Object.values(props.receipts), "Food")]);

  const [Clothes, setClothes] = useState(["Clothes", determineTotal(Object.values(props.receipts), "Clothes")]);

  const [TotalExpenses, setTotalExpenses] = useState(determineTotalCost(Object.values(props.receipts)));

  const [ClothesPercentage, setClothesPercentage] = useState(determinePercentage(Object.values(props.receipts), "Clothes", determineClothes(Object.values(props.budget))));

  const [FoodPercentage, setFoodPercentage] = useState(determinePercentage(Object.values(props.receipts), "Food", determineFood(Object.values(props.budget))));

  const [GroceryPercentage, setGroceryPercentage] = useState(determinePercentage(Object.values(props.receipts), "Grocery", determineGrocery(Object.values(props.budget))));

  const [GroceryLeft, setGroceryLeft] = useState([determineLeft(determineGrocery(Object.values(props.budget)),determineTotal(Object.values(props.receipts), "Grocery")), determineLeftBar(determineGrocery(Object.values(props.budget)),determineTotal(Object.values(props.receipts), "Grocery"))]);

  const [FoodLeft, setFoodLeft] = useState([determineLeft(determineFood(Object.values(props.budget)),determineTotal(Object.values(props.receipts), "Food")), determineLeftBar(determineFood(Object.values(props.budget)),determineTotal(Object.values(props.receipts), "Food"))]);

  const [ClothesLeft, setClothesLeft] = useState([determineLeft(determineClothes(Object.values(props.budget)),determineTotal(Object.values(props.receipts), "Clothes")), determineLeftBar(determineClothes(Object.values(props.budget)),determineTotal(Object.values(props.receipts), "Clothes"))]);

  const [didRefresh, setDidRefresh] = useState(false);

  const [visible, setVisible] = useState(true);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  function determineLeft(budget, expense) {
    return budget - expense;
  }

  function determineLeftBar(budget, expense) {
      if ((budget - expense) > 0) {
        return budget - expense;
      }
      return 0;
  }

  function determinePercentage(data, category, budgetValue) {
    const total = determineTotal(data, category);
    return total/budgetValue;
  }

  function determineClothes(data) {
  console.log(data);
    if (data.length == 0) {
        return 1;
    }
    return parseInt(data[0].clothes);
  }

  function determineFood(data) {
    if (data.length == 0) {
        return 1;
    }
    return parseInt(data[0].food);
  }

  function determineGrocery(data) {
    if (data.length == 0) {
        return 1;
    }
    return parseInt(data[0].grocery);
  }

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

  const onRefresh = () => {
    // refresh receipts
    props.refreshReceipts()
      .then(() => {
            props.refreshBudget()
                  .then(() => {
                        setDidRefresh(!didRefresh);
                    })
                  .catch((err) => {
                        console.log(err);
                  })
        })
      .catch((err) => {
            console.log(err);
      })
  }

  React.useEffect(() => {
        setGroceryLeft([determineLeft(determineGrocery(Object.values(props.budget)),determineTotal(Object.values(props.receipts), "Grocery")), determineLeftBar(determineGrocery(Object.values(props.budget)),determineTotal(Object.values(props.receipts), "Grocery"))]);
        setFoodLeft([determineLeft(determineFood(Object.values(props.budget)),determineTotal(Object.values(props.receipts), "Food")), determineLeftBar(determineFood(Object.values(props.budget)),determineTotal(Object.values(props.receipts), "Food"))]);
        setClothesLeft([determineLeft(determineClothes(Object.values(props.budget)),determineTotal(Object.values(props.receipts), "Clothes")), determineLeftBar(determineClothes(Object.values(props.budget)),determineTotal(Object.values(props.receipts), "Clothes"))]);
        setClothes(["Clothes", determineTotal(Object.values(props.receipts), "Clothes")]);
        setGrocery(["Grocery", determineTotal(Object.values(props.receipts), "Grocery")]);
        setFood(["Food", determineTotal(Object.values(props.receipts), "Food")]);
        setClothesPercentage(determinePercentage(Object.values(props.receipts), "Clothes", determineClothes(Object.values(props.budget))));
        setGroceryPercentage(determinePercentage(Object.values(props.receipts), "Grocery", determineGrocery(Object.values(props.budget))));
        setFoodPercentage(determinePercentage(Object.values(props.receipts), "Food", determineFood(Object.values(props.budget))));
        setTotalExpenses(determineTotalCost(Object.values(props.receipts)))
    }, [didRefresh])

  return (
    <View style={styles.container}>
    <ScrollView
      fadingEdgeLength={200}
      refreshControl={
        <RefreshControl
          refreshing={Object.entries(props.receipts).length === 0 && Object.entries(props.budget).length == 0 && props.isLoading && props.isBudgetLoading}
          onRefresh={onRefresh}
        />}
        >
        <View style={styles.section}>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlayS}>
            <Text>Pull down from the top to update data</Text>
        </Overlay>
        <Text size={25} style={styles.dTitle}>EXPENSE DASHBOARD</Text>
        <Text size={30} bold black style={styles.dashboardTitle}>${TotalExpenses}</Text>
        <Text style={styles.dashboardSubTitle}>Total Expenses</Text>
          <VictoryPie
                    disableInlineStyles
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
                    Expenses by category
                  </Text>
                  <View style={styles.row}>
                  <View style={styles.rowItem}>
                  <VictoryLegend x={25} y={25}
                    disableInlineStyles
                    padding={{top: 0, bottom: 0, right: 20, left: 20}}
                    orientation="vertical"
                    gutter={20}
                    //rowGutter={{ top: 0, bottom: 3 }}
                    data={[
                        { name: `${Grocery[0]} $${Grocery[1]}`, symbol: { fill: "#F19820" }, labels: { fill: "black" }  },
                        { name: `${Food[0]} $${Food[1]}`, symbol: { fill: "#03989E" }, labels: { fill: "black" }  },
                        { name: `${Clothes[0]} $${Clothes[1]}`, symbol: { fill: "#EDCFC5" }, labels: { fill: "black" }  }
                      ]}
                  />
                  </View>
                  <View style={styles.pBarStyle}>
                  <ProgressBar
                            color="#F19820"
                            styleAttr="Horizontal"
                            indeterminate={false}
                            progress={GroceryPercentage}
                          />
                  <View style={styles.pBarItem}>
                  <ProgressBar
                            color="#03989E"
                            styleAttr="Horizontal"
                            indeterminate={false}
                            progress={FoodPercentage}
                          />
                  </View>
                  <View style={styles.pBarItem}>
                  <ProgressBar
                            color="#EDCFC5"
                            styleAttr="Horizontal"
                            indeterminate={false}
                            progress={ClothesPercentage}
                          />
                  </View>
                  </View>
                  </View>
         </View>

        <View style={styles.descriptionBar}>
                  <Text size={20} style={styles.title}>
                    Expenses vs. Budget
                  </Text>
                  <VictoryStack domainPadding={70}>
                        <VictoryBar
                            style={{ data: {fill: ({ x }) =>
                                x === "a" ? "#F19820"
                                : x === "b" ? "#03989E"
                                : x === "c" ? "#EDCFC5"
                                : "#EDCFC5"
                            }}}
                            data={[{x: "a", y: Grocery[1]}, {x: "b", y: Food[1]}, {x: "c", y: Clothes[1]}]} />
                        <VictoryBar
                            style={{ data: {fill: ({ x }) =>
                                x === "a" ? "#f5c385"
                                : x === "b" ? "#bee4e6"
                                : x === "c" ? "#faf3f0"
                                : "#EDCFC5"
                            }}}
                        data={[{x: "a", y: GroceryLeft[1]}, {x: "b", y: FoodLeft[1]}, {x: "c", y: ClothesLeft[1]}]} />
                  </VictoryStack>
                  <Text size={20} style={styles.titleBar}>Budgeted amount left</Text>
                  <View style={styles.row}>
                  <View style={styles.rowItem}>
                  <VictoryLegend x={25} y={25}
                    disableInlineStyles
                    padding={{top: 0, bottom: 0, right: 20, left: 20}}
                    orientation="vertical"
                    gutter={20}
                    //rowGutter={{ top: 0, bottom: 3 }}
                    data={[
                        { name: `${Grocery[0]} $${GroceryLeft[0]}`, symbol: { fill: "#F19820" }, labels: { fill: "black" }  },
                        { name: `${Food[0]} $${FoodLeft[0]}`, symbol: { fill: "#03989E" }, labels: { fill: "black" }  },
                        { name: `${Clothes[0]} $${ClothesLeft[0]}`, symbol: { fill: "#EDCFC5" }, labels: { fill: "black" }  }
                      ]}
                  />
                  </View>
                  <View style={styles.legendText}>
                  {
                    GroceryLeft[0] < 0 ? (
                    <Text style={styles.legendBar}>Overbudget!</Text>
                    ) : (
                    <Text style={{ color: 'white', marginTop: 10 }}>Overbudget!</Text>
                  )}
                  {
                    FoodLeft[0] < 0 ? (
                    <Text style={styles.legendBar}>Overbudget!</Text>
                    ) : (
                    <Text style={{ color: 'white', marginTop: 10 }}>Overbudget!</Text>
                  )}
                  {
                    ClothesLeft[0] < 0 ? (
                    <Text style={styles.legendBar}>Overbudget!</Text>
                    ) : (
                    <Text style={{ color: 'white', marginTop: 10 }}>Overbudget!</Text>
                  )}
                  </View>
                  </View>
         </View>
        <View style={styles.descriptionS}>
                  <Text size={20} style={styles.suggestTitle}>
                    Budget Suggestions
                  </Text>
                  <View style={styles.row}>
                  <View style={styles.rowItem}>
                        <View style={styles.iconPadding}>
                            <Image source={require('../../../assets/images/currency.png')}/>
                        </View>
                        <View style={styles.iconPadding}>
                            <Image source={require('../../../assets/images/check-circle-outline.png')}/>
                        </View>
                        <View style={styles.iconPadding}>
                            <Image source={require('../../../assets/images/check-circle-outline.png')}/>
                        </View>
                        <View style={styles.iconPadding}>
                            <Image source={require('../../../assets/images/check-circle-outline.png')}/>
                        </View>
                  </View>
                  <View style={styles.rowDesc}>
                        <View style={{ paddingBottom: 30}}>
                            <Text style={{ color: 'black' }}>{"We noticed that you've been spending a lot of money on "}<Text style={{ color: '#f8a494' }}>{"Clothes"}</Text>{" recently, especially at"}<Text style={{ color: 'black', fontStyle: 'italic'}}>{" Nordstrom."}</Text>{" Here are some tips to cut back:"}</Text>
                        </View>
                        <View style={styles.iconPadding}>
                            <Text style={{ color: 'black' }}>{"Try shopping at a cheaper store than "}<Text style={{ fontStyle: 'italic'}}>{"Nordstrom"}</Text>{". We found cheaper options like "}<Text style={{ fontStyle: 'italic' }}>{"Macy's"}</Text>{" and "}<Text style={{ fontStyle: 'italic' }}>{"TJ Maxx."}</Text></Text>
                        </View>
                        <View style={{ paddingBottom: 60}}>
                            <Text style={{ color: 'black' }}>{"Try to keep within a weekly budget of $50 for "}<Text style={{ color: '#f8a494' }}>{"Clothes"}</Text></Text>
                        </View>
                        <View>
                            <Text style={{ color: 'black' }}>{"You've been going underbudget for "}<Text style={{ color: "#03989E" }}>{"Food"}</Text>{". How about increasing your budget for "}<Text style={{ color: '#f8a494' }}>{"Clothes"}</Text>{" and reducing your budget for "}<Text style={{ color: "#03989E" }}>{"Food?"}</Text></Text>
                        </View>
                  </View>
                  </View>
         </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayS: {
    bottom: 160,
  },
  dTitle: {
  fontSize: 20,
  //alignItems: 'center',
  //justifyContent: 'center',
  paddingBottom: 20,
  backgroundColor: "#F19820",
  color: 'white',
  paddingTop: 20,
  marginTop: 20,
  marginBottom: 0,
  paddingHorizontal: 20,
  elevation: 10,
  shadowColor: '#52006A',
  marginBottom: -30,
  },
  container: {
    //flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    flexDirection: "column",
    //height: Dimensions.get('window').height
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  section: {
    flex: 2,
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
    marginTop: -30,
    elevation: 20,
    shadowColor: '#52006A',
    backgroundColor: 'white',
    borderRadius: 8,
    //paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    width: '90%',
    height: 200,
    marginBottom: 50,
  },
  descriptionBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
    elevation: 20,
    shadowColor: '#52006A',
    backgroundColor: 'white',
    borderRadius: 8,
    //paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    width: '90%',
    height: 600,
    marginBottom: 50,
  },
    descriptionS: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -30,
      elevation: 20,
      shadowColor: '#52006A',
      backgroundColor: 'white',
      borderRadius: 8,
      //paddingVertical: 20,
      paddingHorizontal: 15,
      marginVertical: 10,
      marginHorizontal: 20,
      width: '90%',
      height: 500,
      marginBottom: 50,
    },
  titleDescription: {
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  dashboardTitle: {
       position: 'absolute',
       top: 250,
       color: 'black',
       marginTop: 0,
     },
  dashboardSubTitle: {
       //position: 'absolute',
       top: 220,
       color: 'black',
       marginTop: 0,
  },
  title: {
    marginTop: 170,
    color: 'black',
  },
  legendText: {
    marginTop: 20,
    flex: 1,
  },
  titleBar: {
    color: 'black',
    marginTop: 10,
  },
  legendBar: {
      color: 'red',
      marginTop: 10,
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
    rowIcon: {
      flex: 1,
    },
      rowDesc: {
        flex: 3,
      },
  iconPadding: {
    paddingBottom: 50,
  },
  pBarStyle: {
    marginTop: 30,
    flex: 1,
  },
  pBarItem: {
    marginTop: 18,
  },
    suggestTitle: {
      paddingBottom: 10,
      color: 'black',
    },
});
