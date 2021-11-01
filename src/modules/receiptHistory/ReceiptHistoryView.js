import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';

export default function ReceiptHistoryScreen(props) {
  
  console.log("-----RECEIPTS------");
  console.log(props.receipts);

  return (
    <View>
      {
        Object.entries(props.receipts).map(([key, value]) => {
          const date = new Date(value.date);
          return (
            <Card key={key}>
              <Card.Title>
                <Text>{date.toDateString()}</Text>
                <Text>{value.companyName}</Text>
              </Card.Title>
              <Card.Divider />
              <Text>{value.category}</Text>
              <Text>Total Expenses: ${value.totalExpenses}</Text>
            </Card>
          );
        })
      }
    </View>
  );
}