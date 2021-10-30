import React, { useState } from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import DateTimePicker from '@react-native-community/datetimepicker';
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
import * as RNFS from 'react-native-fs';

export default function SearchScreen(props) {

    const [search, setSearch] = useState("");

    const [date, setDate] = useState("");

    const [category, setCategory] = useState("");

    const [searchResults, setSearchResults] = useState([]);

    const { handleSubmit, control, reset, getValues, formState: { errors } } = useForm({
    defaultValues: {
      search: "",
      date: new Date(),
      category: "none"
    }
  });

  const [show, setShow] = useState(false);

  const onSubmit = async data => {
      if (data.search !== '') {
        setSearch(data.search);
      }
      if (data.date !== '') {
        setDate(data.date);
      }
      setCategory(data.category);
      //console.log(search);
      console.log(data.date);
      console.log(data.category);
    };

  React.useEffect(() => {
    let filteredResults = Object.values(props.receipts);
    console.log(filteredResults);
    if (date !== "") {
                filteredResults = filteredResults.filter(result => dayjs(result.date).format('DD/MM/YYYY') === dayjs(date).format('DD/MM/YYYY'))
                console.log(dayjs(date).format('DD/MM/YYYY'));
        }
    if (search != "") {
            filteredResults = filteredResults.filter(result => result.companyName.includes(search))
            //console.log(search);
    }
    if (category != "none") {
                filteredResults = filteredResults.filter(result => result.category === category)
                console.log('date');
                console.log(category);
    }
    console.log(filteredResults);
    setSearchResults(filteredResults);
  }, [search, date, category]);

  return (
  <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
    <View>
           <Controller
                     control={control}
                     render={({field: { onChange, onBlur, value }}) => (
                       <TextInput
                         style={styles.input}
                         onBlur={onBlur}
                         onChangeText={input => onChange(input)}
                         value={value}
                       />
                     )}
                     name="search"
                     rules={{ required: true }}
                   />
                <View style={styles.rowContainer}>
                <Text>
                Category:
                </Text>
                </View>
                <View style={styles.rowContainer}>
                   <Controller
                             control={control}
                             render={({field: { onChange, value }}) => (
                               <Picker
                                 style={styles.picker}
                                 selectedValue={value}
                                 onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
                               >
                                 {
                                   dropdownItems.map(item => <Picker.Item key={item.key} label={item.label} value={item.value} />)
                                 }
                               </Picker>
                           )}
                             name="category"
                             rules={{ required: true }}
                           />
                </View>
                <View style={styles.rowContainer}>
                <Text>
                Date:
                </Text>
                </View>
                <View style={styles.rowContainer}>
                <View style={styles.date}>
                <Button onPress={() => setShow(!show)} title={`${getValues("date")}`} />
                <Controller
                            control={control}
                            render={({field: { onChange, value }}) => (
                              show && (
                              <DateTimePicker
                                value={value}
                                mode="date"
                                onChange={(event, newDate) => {
                                  setShow(!show);
                                  onChange(newDate);
                                }}
                              />
                    )
                            )}
                            name="date"
                            rules={{ required: true }}
                          />
                </View>
                          <View style={styles.date}>
                      <Button style={[styles.button, {flexBasis: '47%'}]}
                              primary
                              rounded
                              title="Search"
                              onPress={handleSubmit(onSubmit)} />
                              </View>
                      </View>
        <View style={styles.sectionLarge}>
        <View>
                   {searchResults.map((results) => {
                                  const date = new Date(results.date);
                                  return (
                                    <Card>
                                      <Card.Title>{date.toDateString()} {results.companyName}</Card.Title>
                                      <Card.Divider />
                                      <Text>{results.totalExpenses}</Text>
                                    </Card>
                     );
                    })
                   }
        </View>
        </View>
    </View>
    </ScrollView>
  );
}

const dropdownItems = [
    {key: 1, label: 'Grocery', value: 'grocery'},
    {key: 2, label: 'Food', value: 'food'},
    {key: 3, label: 'Clothes', value: 'clothes'},
    {key: 4, label: 'None', value: 'none'},
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
  button: {
    marginTop: 8,
    marginBottom: 8,
  },
  date: {
      flex: 1,
      paddingRight: 5,
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
