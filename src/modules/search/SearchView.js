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

const noReceiptImage = require('../../../assets/images/no-receipt.png');

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
    console.log(date == "");
    console.log(search == "");
    console.log(category == "");
    console.log(filteredResults);
    if (date !== "") {
                filteredResults = filteredResults.filter(result => dayjs(result.date).format('DD/MM/YYYY') === dayjs(date).format('DD/MM/YYYY'));
                //console.log(dayjs(date).format('DD/MM/YYYY'));
        }
    if (search != "") {
            //console.log(search);
            if (filteredResults.filter(result => result.companyName.toLowerCase().includes(search.toLowerCase())).length == 0) {
                filteredResults =filteredResults.filter(result => result.description.toLowerCase().includes(search.toLowerCase()));
            } else {
                filteredResults = filteredResults.filter(result => result.companyName.toLowerCase().includes(search.toLowerCase()));
            }
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
        { (search != "" || category != "" || date != "") ? (
        <View>
                   {searchResults.map((results) => {
                                  const date = new Date(results.date);
                                  const imageUri = `file://${results.imagePath}`;
                                  return (
                                    <View style={styles.cardContainer}>
                                        <View style={styles.cardTitle}>
                                            <View style={styles.cardTitleText}>
                                                <Text>{date.toDateString()} </Text>
                                                <Text>{results.companyName}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.cardDivider} />
                                        <View style={styles.cardBody}>
                                        <View style={styles.cardImageContainer}>
                                            {
                                                results.imagePath !== ''? (
                                                    <Lightbox activeProps={{width: '100%', height: '100%'}}>
                                                        <Image
                                                            source={{ uri: imageUri }}
                                                            style={styles.cardImage}
                                                        />
                                                    </Lightbox>
                                                ) : (
                                                    <Image
                                                        source={noReceiptImage}
                                                        style={styles.cardImage}
                                                    />
                                                )
                                            }
                                        </View>
                                            <View style={styles.cardBodyTextContainer}>
                                                <Text>Category: {results.category}</Text>
                                                <Text>Total Expenses: ${results.totalExpenses}</Text>
                                            </View>
                                        </View>
                                     </View>
                     );
                    })
                   }
        </View>
        ) : <Text></Text>}
        </View>
    </View>
    </ScrollView>
  );
}

const dropdownItems = [
    {key: 1, label: 'Grocery', value: 'Grocery'},
    {key: 2, label: 'Food', value: 'Food'},
    {key: 3, label: 'Clothes', value: 'Clothes'},
    {key: 4, label: 'None', value: 'None'},
]

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    borderColor: '#e3dfe0',
    borderWidth: 0.2,
    elevation: 5,
  },
  cardTitle: {
    flexDirection: 'row',
    padding: 5,
  },
  cardTitleText: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardTitleEdit: {
   flex: 1,
   alignSelf: 'flex-end',
  },
  cardDivider: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginRight: 20,
    marginLeft: 20,
  },
  cardBody: {
    width: '100%',
    padding: 10,
  },
  cardImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    height: 200,
    width: 200,
  },
  searchTitle: {
  fontSize: 20,
  alignItems: 'center',
  justifyContent: 'center',
  paddingBottom: 20,
  backgroundColor: "#F19820",
  color: 'white',
  paddingTop: 20,
  marginBottom: 20,
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
