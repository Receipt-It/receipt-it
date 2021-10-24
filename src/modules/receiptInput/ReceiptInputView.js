import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, Button,  StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ReceiptInputScreen() {

  const { handleSubmit, control, reset, getValues, formState: { errors } } = useForm({
    defaultValues: {
      companyName: "",
      date: new Date(),
      description: ""
    }
  });

  const onSubmit = data => {
    console.log(data);
  };

  const [show, setShow] = useState(false);

  console.log('errors', errors);

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
        <View style={styles.half}>
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
        <View style={styles.half}>
          <Text style={styles.label}>Total Expenses</Text>
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
            name="totalExpenses"
            rules={{ required: true }}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.half}>
          <Text style={styles.label}>Keywords</Text>
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
            name="keywords"
            rules={{ required: true }}
          />
        </View>
        <View style={styles.half}>
          <Text style={styles.label}>Category</Text>
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
            name="category"
            rules={{ required: true }}
          />
        </View>
      </View>
      <View>
        <Text style={styles.label}>Description</Text>
        <Controller
          control={control}
          render={({field: { onChange, onBlur, value }}) => (
            <TextInput
              style={styles.description}
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
});