import React from 'react';
import DatePicker from 'react-native-datepicker';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Image,
  ScrollView
} from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { Picker } from '@react-native-picker/picker';
import Lightbox from 'react-native-lightbox';

import { Card, ListItem, Button, Icon, SearchBar } from 'react-native-elements';

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';
import { Dropdown } from '../../components';

export default class SearchScreen extends React.Component {

   state = {
      search: '',
      value: '',
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
  <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
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
                <Text>
                Category:
                </Text>
                </View>
                <View style={styles.rowContainer}>
                                            <Picker
                                              style={styles.picker}
                                              selectedValue={this.state.value}
                                              onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
                                            >
                                              {
                                                dropdownItems.map(item => <Picker.Item key={item.key} label={item.label} value={item.value} />)
                                              }
                                            </Picker>
                </View>
                <View style={styles.rowContainer}>
                <Text>
                Date:
                </Text>
                </View>
                <View style={styles.rowContainer}>
                <DatePicker
                style={{width: '100%', height: '50%'}}
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
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                      />
                      </View>
        <View style={styles.sectionLarge}>
          <Card>
            <Card.Title>4/27/2019 Target</Card.Title>
            <Card.Divider/>
            <View style={styles.rowContainer}>
            <Lightbox activeProps={{width: '100%', height: '100%'}}>
            <Image style={styles.image} source={require('../../../assets/images/TestReceipt.jpg')} />
            </Lightbox>
            <Text>
            $50 No description
            </Text>
            </View>
            <Card.Divider/>
            <Text>
            Groceries
            </Text>
          </Card>
        </View>
    </View>
    </ScrollView>
  );
  }
}

const dropdownItems = [
  {key: 1, label: 'Groceries', value: 'groceries'},
  {key: 2, label: 'Entertainment', value: 'entertainment'},
  {key: 3, label: 'Transportation', value: 'transportation'},
]

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
  picker: {
      backgroundColor: 'white',
      borderColor: 'black',
      width:'100%',
      borderWidth: 0.5,
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
