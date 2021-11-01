import React, { useState, useEffect, useRef } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import RNFS from 'react-native-fs';
import Permissions from 'react-native-permissions';
import { Text, View, ScrollView, TextInput, Button,  StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Image } from 'react-native-elements';
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import RNDocumentScanner  from "react-native-document-scanner";

export default function ReceiptInputScreen() {

  const [calendarShow, setcalendarShow] = useState(false);
  const [scannerShow, setScannerShow] = useState(false);

  const scannerRef = useRef(null);

  const [scannerData, setScannerData] = useState({});
  const [scannerAllowed, setScannerAllowed] = useState(false);

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

  const [imagePath, setImagePath] = useState('');

  useEffect(() => {
    async function requestCamera() {
      const result = await Permissions.request('android.permission.CAMERA');
      if (result === "granted") setScannerAllowed(true);
    }
    requestCamera();
  }, []);

  const openScanner = () => {
    setScannerShow(!scannerShow);
    setIsCropping(false);
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
    const newId = uuidv4();

    // try to read the current data file
    RNFS.readFile(path, 'utf8')
      // add the new data 
      .then((currentData) => {
        const parsedData = JSON.parse(currentData);

        parsedData[newId] = data;
        parsedData[newId].imagePath = `${RNFS.ExternalDirectoryPath}/${newId}.png`;

        RNFS.writeFile(path, JSON.stringify(parsedData), 'utf8');
        RNFS.moveFile(imagePath, parsedData[newId].imagePath);

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
        dataJson[newId].imagePath = `${RNFS.ExternalDirectoryPath}/${newId}.png`;

        RNFS.writeFile(path, JSON.stringify(dataJson), 'utf8');
        RNFS.moveFile(imagePath, dataJson[newId].imagePath);

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
            <View>
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
                <Button onPress={() => setcalendarShow(!calendarShow)} title={`${getValues("date").toDateString()}`} />
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
              <Button title="Scan receipt" onPress={openScanner} />
            </View>
            <View style={formStyles.button}>
              <Button
                title="Submit"
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </ScrollView>
        )}
      {
        scannerShow ? (
          <View style={scannerStyles.bottomButtons}>
            <View style={scannerStyles.cancel}>
              <Button title="Cancel" onPress={openScanner} />
            </View>
            {
              isCropping ? (
                <View style={scannerStyles.confirm}>
                  <Button title="Confirm" onPress={onCropImage} />
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
  {key: 1, label: 'Grocery', value: 'grocery'},
  {key: 2, label: 'Food', value: 'food'},
  {key: 3, label: 'Clothes', value: 'clothes'},
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
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  description: {
    backgroundColor: 'white',
    flex: 1,
    flexWrap: 'wrap',
    height: 100,
    padding: 10,
    borderRadius: 4,
  },
  input: {
    backgroundColor: 'white',
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
  }
});