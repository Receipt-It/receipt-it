import React from 'react';
import DatePicker from 'react-native-datepicker';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Image
} from 'react-native';
import Lightbox from 'react-native-lightbox';

import { Card, ListItem, Button, Icon, SearchBar } from 'react-native-elements';

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';
import { Dropdown } from '../../components';

export default class SearchScreen extends React.Component {
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
   state = {
      search: '',
    };

    updateSearch = (search) => {
      this.setState({ search });
    };

    constructor(props){
        super(props)
        this.state = {date:"2016-05-15"}
      }

  render() {
  const { search } = this.state;

  return (
    <View style={styles.container}>
           <SearchBar
                   inputStyle={{backgroundColor: 'white'}}
                   leftIconContainerStyle={{backgroundColor: 'white'}}
                   inputContainerStyle={{backgroundColor: 'white'}}
                   containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
                   placeholderTextColor={'#g5g5g5'}
                   placeholder={'Pritish Vaidya'}
                  placeholder="Search Here..."
                  onChangeText={this.updateSearch}
                  value={search}
                />
                <View style={styles.rowContainer}>
                <Text style={styles.dropdown}>
                Category:
                </Text>
                <Text style={styles.dropdown}>
                Date:
                </Text>
                </View>
                <View style={styles.rowContainer}>
                <Dropdown
                          style={{ alignSelf: 'center', backgroundColor: 'white', marginRight: 35 }}
                          placeholder="Select Category"
                          color="black"
                          borderColor="black"
                          onSelect={() => {}}
                          items={['Groceries', 'Entertainment', 'Transportation']}
                        />
                <DatePicker
                        style={{width: 200}}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="2016-05-01"
                        maxDate="2016-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                          },
                          dateInput: {
                            marginLeft: 36,
                            backgroundColor: 'white',
                            borderColor: "black",
                            borderRadius: 5
                          }
                          // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                      />
                      </View>
        <View style={styles.sectionLarge}>
          <Card>
            <Card.Title>8/11/2021 Trader Joes</Card.Title>
            <Card.Divider/>
            <View style={styles.rowContainer}>
            <Image style={styles.image} source={require('../../../assets/images/TestReceipt.jpg')} />
            <Text>
            No description
            </Text>
            </View>
            <Card.Divider/>
            <Text>
            Groceries
            </Text>
          </Card>
        </View>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colors.bluish,
      paddingHorizontal: 15,
      paddingTop: 20,
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
    padding: 15,
    lineHeight: 25,
  },
  titleDescription: {
    color: '#19e7f7',
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  title: {
    marginTop: 30,
  },
  price: {
    marginBottom: 5,
  },
  priceLink: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  image: {
      height: 100,
      width: 100,
      marginBottom: 5,
      marginRight: 5,
    },
  rowContainer: {
      flexDirection: 'row'
  },
  dropdown: {
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
    },
});
