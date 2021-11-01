import React, { useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import RNFS from 'react-native-fs';
import { Text, View, ScrollView, TextInput, Button,  StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

export default function BudgetInputScreen() {

  const { handleSubmit, control, reset, getValues, formState: { errors } } = useForm({
    defaultValues: {
      clothes: 0,
      food: 0,
      grocery: 0
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
      <View style={styles.row}>
        <View style={styles.date}>
          <Text style={styles.label}>Category</Text>
          <Text style={styles.label}>Clothes:</Text>
        </View>
        <View style={styles.expenses}>
          <Text style={styles.label}>Projected Expense</Text>
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
            name="clothes"
            rules={{ required: true }}
          />
        </View>
      </View>
      <View style={styles.row}>
      <View style={styles.date}>
                <Text style={styles.label}>Food:</Text>
      </View>
      <View style={styles.expenses}>
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
                  name="food"
                  rules={{ required: true }}
                />
      </View>
      </View>
      <View style={styles.row}>
            <View style={styles.date}>
                      <Text style={styles.label}>Grocery:</Text>
            </View>
            <View style={styles.expenses}>
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
                        name="grocery"
                        rules={{ required: true }}
                      />
            </View>
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

const path = `${RNFS.ExternalDirectoryPath}/budget.txt`;

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
  inputFields: {
    paddingTop: 50,
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