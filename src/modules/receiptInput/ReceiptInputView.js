import React, { useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import RNFS from 'react-native-fs';
import { Text, View, ScrollView, TextInput, Button,  StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

export default function ReceiptInputScreen() {

  const { handleSubmit, control, reset, getValues, formState: { errors } } = useForm({
    defaultValues: {
      companyName: "",
      totalExpenses: "",
      date: new Date(),
      description: "",
      category: 'grocery'
    }
  });

  const onSubmit = async data => {    
    const newId = uuidv4();

    // try to read the current data file
    RNFS.readFile(path, 'utf8')
      // add the new data 
      .then((currentData) => {
        const parsedData = JSON.parse(currentData);
        parsedData[newId] = data;

        RNFS.writeFile(path, JSON.stringify(parsedData), 'utf8');
      })
      // if file does not exist then write the first entry
      .catch(() => {

        const dataJson = { [newId]: data };
        RNFS.writeFile(path, JSON.stringify(dataJson), 'utf8');
      })

  };

  // calendar show
  const [show, setShow] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.label}>Company Name</Text>
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
          name="companyName"
          rules={{ required: true }}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.date}>
          <Text style={styles.label}>Date</Text>
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
        <View style={styles.expenses}>
          <Text style={styles.label}>Total Expenses</Text>
          <Controller
            control={control}
            render={({field: { onChange, onBlur, value }}) => (
              <TextInput
                style={styles.input}
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
        <Text style={styles.label}>Category</Text>
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
      <View>
        <Text style={styles.label}>Description</Text>
        <Controller
          control={control}
          render={({field: { onChange, onBlur, value }}) => (
            <TextInput
              style={styles.description}
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
      <View style={styles.button}>
        <Button
          style={styles.buttonInner}
          color
          title="Submit"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </ScrollView>
  );
};

const path = `${RNFS.ExternalDirectoryPath}/data.txt`;

const dropdownItems = [
  {key: 1, label: 'Grocery', value: 'grocery'},
  {key: 2, label: 'Food', value: 'food'},
  {key: 3, label: 'Clothes', value: 'clothes'},
]

const styles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  row: {
    flexDirection: 'row'
  },
  half: {
    flex: 1,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    paddingTop: 10,
    padding: 10,
    backgroundColor: '#0e101c',
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