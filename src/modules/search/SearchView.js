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
  ScrollView,
  Button
} from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { Picker } from '@react-native-picker/picker';
import Lightbox from 'react-native-lightbox';

import { Card, ListItem, Icon, SearchBar } from 'react-native-elements';

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
      date: "",
      category: "none"
    }
  });

  const [show, setShow] = useState(false);

  const [clear, setClear] = useState(false);

  const testDate = new Date();

  const handleClear = () => {
      setDate("");
      setClear(true);
  }

  const onSubmit = async data => {
      setSearch(data.search);
      if (!clear) {
        setDate(data.date);
      }
      setCategory(data.category);
      console.log(data);
    };

  React.useEffect(() => {
     setDate("");
  }, [clear])

  React.useEffect(() => {
      setClear(false);
  }, [show])

  React.useEffect(() => {
    let filteredResults = Object.values(props.receipts);
    console.log(filteredResults);
    if (date !== "") {
                filteredResults = filteredResults.filter(result => dayjs(result.date).format('DD/MM/YYYY') === dayjs(date).format('DD/MM/YYYY'));
                //console.log(dayjs(date).format('DD/MM/YYYY'));
        }
    if (search != "") {
            filteredResults = filteredResults.filter(result => result.companyName.toLowerCase().includes(search.toLowerCase()));
            //console.log(search);
    }
    if (category != "" && category != "none") {
                filteredResults = filteredResults.filter(result => result.category === category);
                console.log('category is not none');
                //console.log(category);
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
    <View style={styles.card}>
                    <Text style={styles.searchTitle}>SEARCH RECEIPTS</Text>
                    <View style={styles.rowContainer}>
                    <Text>
                    Search by company/description:
                    </Text>
                    </View>
           <Controller
                     control={control}
                     value=""
                     render={({field: { onChange, onBlur, value }}) => (
                       <TextInput
                         style={styles.input}
                         onBlur={onBlur}
                         onChangeText={input => onChange(input)}
                         value={value}
                       />
                     )}
                     name="search"
                     rules={{ required: false }}
                   />
                <View style={styles.rowContainer}>
                <Text>
                Category:
                </Text>
                </View>
                <View style={styles.rowContainer}>
                   <Controller
                             control={control}
                             value="none"
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
                             rules={{ required: false }}
                           />
                </View>
                <View style={styles.rowContainer}>
                <Text>
                Date:
                </Text>
                </View>
                <View style={styles.rowContainer}>
                <View style={styles.date}>
                <Button color= '#f8a494' onPress={() => setShow(!show)} title={`Choose Date`} />
                <Controller
                            control={control}
                            render={({field: { onChange, value }}) => (
                              show && (
                              <DateTimePicker
                                value={testDate}
                                mode="date"
                                onChange={(event, newDate) => {
                                  setShow(!show);
                                  if (newDate !== undefined && clear == false) {
                                    onChange(newDate);
                                  }
                                }}
                              />
                    )
                            )}
                            name="date"
                            rules={{ required: false }}
                          />
                </View>
                <View style={styles.date}>
                                      <Button color='#A3B2B1' style={[styles.button, {flexBasis: '47%'}]}
                                              primary
                                              rounded
                                              title="Clear Date"
                                              onPress={() => setClear(!clear)} />
                                              </View>
                          <View style={styles.date}>
                      <Button color="#03989E" style={[styles.button, {flexBasis: '47%'}]}
                              primary
                              rounded
                              title="Search"
                              onPress={handleSubmit(onSubmit)} />
                              </View>
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
                                                                          <View style={styles.rowContainer}>
                                                                          <Lightbox activeProps={{width: '100%', height: '100%'}}>
                                                                                <Image style={styles.image} source={{ uri: `file://${results.imagePath}` }}
                                                                          />
                                                                          </Lightbox>
                                                                          <Text>
                                                                                {results.description}
                                                                          </Text>
                                                                          </View>
                                                                          <Card.Divider/>
                                                                          <Text>{results.category} ${results.totalExpenses}</Text>
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
  searchTitle: {
  fontSize: 20,
  alignItems: 'center',
  justifyContent: 'center',
  paddingBottom: 20,
  backgroundColor: "#F19820",
  color: 'white',
  paddingTop: 20,
  marginBottom: 20,
  //padding: 10,
  paddingHorizontal: 80,
  },
  container: {
      flex: 1,
      backgroundColor: colors.bluish,
      //paddingHorizontal: 15,
      paddingTop: 20,
    },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  button: {
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "#A3B2B1",
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
      backgroundColor: colors.blueish,
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
      padding: 10,
      color: 'black',
      backgroundColor: colors.bluish,
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
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 15,
    width: '90%',
    marginVertical: 5,
    marginHorizontal: 20,
    elevation: 10,
    shadowColor: '#52006A',
  }
});
