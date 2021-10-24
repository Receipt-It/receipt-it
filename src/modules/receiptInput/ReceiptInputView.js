import React, { useState } from 'react';
import { Text, View, TextInput, Button,  StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ReceiptInputScreen() {

  const { handleSubmit, control, reset, formState: { errors } } = useForm({
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
    <View style={styles.container}>
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
      <Text style={styles.label}>Date</Text>
      <Button onPress={() => setShow(!show)} title="Choose date" />
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
      <Text style={styles.label}>Description</Text>
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
        name="description"
        rules={{ required: true }}
      />

      <View style={styles.button}>
        <Button
          style={styles.buttonInner}
          color
          title="Button"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
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
    justifyContent: 'center',
    paddingTop: 10,
    padding: 8,
    backgroundColor: '#0e101c',
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});