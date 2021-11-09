import React, { useState, useEffect, useRef } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import RNFS from 'react-native-fs';
import Permissions from 'react-native-permissions';
import { Text, View, ScrollView, TextInput, Button,  StyleSheet, Alert } from "react-native";
import { Image } from 'react-native-elements';
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import RNDocumentScanner  from "react-native-document-scanner";
import { colors } from '../../styles';

export default function ReceiptInputScreen() {

  const [calendarShow, setcalendarShow] = useState(false);
  const [scannerShow, setScannerShow] = useState(false);

  const scannerRef = useRef(null);
  
  const [imagePath, setImagePath] = useState('');

  const [scannerAllowed, setScannerAllowed] = useState(false);
  const [storageAllowed, setStorageAllowed] = useState(false);

  const [isCropping, setIsCropping] = useState(false);

  const { handleSubmit, control, reset, getValues, formState: { errors } } = useForm({
    defaultValues: {
      companyName: "",
      totalExpenses: "",
      date: new Date(),
      description: "",
      category: 'grocery'
    }
  });


  useEffect(() => {
    async function request() {
      const result = await Permissions.requestMultiple(['android.permission.CAMERA', 'android.permission.READ_EXTERNAL_STORAGE', 'android.permission.WRITE_EXTERNAL_STORAGE']);

      if (result["android.permission.CAMERA"] === "granted") setScannerAllowed(true);
      if (result["android.permission.READ_EXTERNAL_STORAGE"] ==='granted' && result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted') setStorageAllowed(true);
    }
    request();
  }, []);

  const openScanner = () => {
    if (scannerAllowed) {
      setScannerShow(!scannerShow);
      setIsCropping(false);
    } else {
      Alert.alert("Permission Denied", "Please allow camera permissions.", [{ text: "OK" }], {cancelable: true});
    }
  };

  const onCropImage = () => {
    scannerRef.current.cropImage()
      .then((imageUri) => {
        setImagePath(imageUri.image);
        setScannerShow(!scannerShow);
        setIsCropping(false);
      });
  }

  const onSubmit = async data => {

    if (storageAllowed) {
      const newId = uuidv4();

      // try to read the current data file
      RNFS.readFile(path, 'utf8')
        // add the new data 
        .then((currentData) => {
          const parsedData = JSON.parse(currentData);

          parsedData[newId] = data;

          RNFS.writeFile(path, JSON.stringify(parsedData), 'utf8');

          if (imagePath !== '') {
            parsedData[newId].imagePath = `${RNFS.ExternalDirectoryPath}/${newId}.png`;
            RNFS.moveFile(imagePath, parsedData[newId].imagePath);
          } else {

            parsedData[newId].imagePath = '';
          }

          Alert.alert("Added Receipt", "Successfully added receipt", [{ text: "OK" }], {cancelable: true});

          // reset form 
          reset({
            companyName: "",
            totalExpenses: "",
            date: new Date(),
            description: "",
            category: 'grocery'
          });

          setImagePath('');
        })
        // if file does not exist then write the first entry
        .catch(() => {

          const dataJson = { [newId]: data };

          RNFS.writeFile(path, JSON.stringify(dataJson), 'utf8');

          if (imagePath !== '') {
            dataJson[newId].imagePath = `${RNFS.ExternalDirectoryPath}/${newId}.png`;
            RNFS.moveFile(imagePath, dataJson[newId].imagePath);
          } else {
            dataJson[newId].imagePath = '';
          }

          Alert.alert("Added Receipt", "Successfully added receipt", [{ text: "OK" }], {cancelable: true});

          // reset form 
          reset({
            companyName: "",
            totalExpenses: "",
            date: new Date(),
            description: "",
            category: 'grocery'
          });

          setImagePath('');
        })
    } else {

      Alert.alert("Permission Denied", "Please allow storage permissions.", [{ text: "OK" }], {cancelable: true});
    }
  };

  return (
    <React.Fragment>
      {
        scannerShow ? (
          <RNDocumentScanner
            ref={scannerRef}
            style={formStyles.scanner}
            onEndCapture={() => setIsCropping(true)}
            overlayColor="rgba(255,130,0, 0.7)"
            enableTorch={false}
            quality={0.5}
            detectionCountBeforeCapture={5}
            detectionRefreshRateInMS={50}
          />
        ) : (
          <ScrollView style={formStyles.container}>
            <View style={formStyles.card}>
              <View>
                <Text style={formStyles.receiptTitle}>INPUT NEW RECEIPT</Text>
                <Text style={formStyles.label}>Company Name</Text>
                <Controller
                  control={control}
                  render={({field: { onChange, onBlur, value }}) => (
                    <TextInput
                      style={formStyles.input}
                      onBlur={onBlur}
                      onChangeText={input => onChange(input)}
                      value={value}
                    />
              )}
                  name="companyName"
                  rules={{ required: true }}
                />
              </View>
              <View style={formStyles.row}>
                <View style={formStyles.date}>
                  <Text style={formStyles.label}>Date</Text>
                  <Button color='#f8a494' onPress={() => setcalendarShow(!calendarShow)} title={`${getValues("date").toDateString()}`} />
                  <Controller
                    control={control}
                    render={({field: { onChange, value }}) => (
                  calendarShow && (
                  <DateTimePicker 
                    value={value}
                    mode="date"
                    onChange={(event, newDate) => {
                      setcalendarShow(!calendarShow);
                      onChange(newDate);
                    }}
                  />
                ))}
                    name="date"
                    rules={{ required: true }}
                  />
                </View>
                <View style={formStyles.expenses}>
                  <Text style={formStyles.label}>Total Expenses</Text>
                  <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                      <TextInput
                        style={formStyles.input}
                        onBlur={onBlur}
                        keyboardType="numeric"
                        onChangeText={input => onChange(input)}
                        value={value}
                      />
              )}
                    name="totalExpenses"
                    rules={{ required: true }}
                  />
                </View>
              </View>
              <View>
                <Text style={formStyles.label}>Category</Text>
                <Controller
                  control={control}
                  render={({field: { onChange, value }}) => (
                    <Picker
                      style={formStyles.picker}
                      selectedValue={value}
                      onValueChange={(itemValue) => onChange(itemValue)}
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
              <View>
                <Text style={formStyles.label}>Description</Text>
                <Controller
                  control={control}
                  render={({field: { onChange, onBlur, value }}) => (
                    <TextInput
                      style={formStyles.description}
                      multiline
                      textAlignVertical="top"
                      onBlur={onBlur}
                      onChangeText={input => onChange(input)}
                      value={value}
                    />
              )}
                  name="description"
                  rules={{ required: true }}
                />
              </View>
              {
              imagePath !== '' ? (
                <View style={formStyles.imageContainer}>
                  <Image
                    containerStyle={formStyles.image}
                    source={{ uri: imagePath }}
                    style={{ width: 200, height: 200 }}
                  />
                </View>
              ) : (
                <View />
              )
            }
              <View style={formStyles.button}>
                <Button color='#A3B2B1' title="Scan receipt" onPress={openScanner} />
              </View>
              <View style={formStyles.button}>
                <Button
                  color="#03989E"
                  title="Submit"
                  onPress={handleSubmit(onSubmit)}
                />
              </View>
            </View>
          </ScrollView>
        )}
      {
        scannerShow ? (
          <View style={scannerStyles.bottomButtons}>
            <View style={scannerStyles.cancel}>
              <Button color='#A3B2B1' title="Cancel" onPress={openScanner} />
            </View>
            {
              isCropping ? (
                <View style={scannerStyles.confirm}>
                  <Button color="#03989E" title="Confirm" onPress={onCropImage} />
                </View>
              ) :
                <View />
            }
          </View>
        ) : (
          <View />
        )
      }
      
    </React.Fragment>
  );
};

const path = `${RNFS.ExternalDirectoryPath}/data.txt`;

const dropdownItems = [
  {key: 1, label: 'Grocery', value: 'Grocery'},
  {key: 2, label: 'Food', value: 'Food'},
  {key: 3, label: 'Clothes', value: 'Clothes'},
]

const scannerStyles = StyleSheet.create({
  scanner: {
    marginBottom: 10,
  },
  bottomButtons: {
    marginTop: 10,
    marginBottom: 5,
    flexDirection: 'row',
  },
  confirm: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
  },
  cancel: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  }
});

const formStyles = StyleSheet.create({
  receiptTitle: {
    fontSize: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingBottom: 20,
    backgroundColor: "#F19820",
    color: 'white',
    paddingTop: 20,
    marginBottom: 20,
    paddingHorizontal: 60,
  },
  label: {
    color: 'black',
    margin: 20,
    marginLeft: 0,
  },
  row: {
    flexDirection: 'row'
  },
  imageContainer: {
    paddingTop: 10,
  },
  image: {
    alignSelf: 'center',
  },
  button: {
    marginTop: 20,
    color: 'white',
    height: 40,
    borderRadius: 4,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  description: {
    backgroundColor: colors.bluish,
    flex: 1,
    flexWrap: 'wrap',
    height: 100,
    padding: 10,
    borderRadius: 4,
  },
  input: {
    backgroundColor: colors.bluish,
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  picker: {
    backgroundColor: 'white',
  },
  date: {
    flex: 1,
    paddingRight: 5,
  },
  expenses: {
    flex: 1,
    paddingLeft: 5
  },
  keywords: {
    flex: 1,
    paddingRight: 5
  },
  category: {
    flex: 1,
    paddingLeft: 5
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
    marginBottom: 30,
    shadowColor: '#52006A',
  }
});