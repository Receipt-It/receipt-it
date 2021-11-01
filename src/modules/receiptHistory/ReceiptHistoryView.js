import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card, Image } from 'react-native-elements';

export default function ReceiptHistoryScreen(props) {
  
  const onRenderItems = ({ item }) => {
    const [key, value] = item;

    console.log(item);

    const date = new Date(value.date);

    return (
      <View>
        <Card key={key}>
          <Card.Title>
            <Text>{date.toDateString()}</Text>
            <Text>{value.companyName}</Text>
          </Card.Title>
          <Card.Divider />
          <View style={{ width: '100%', height: 200}}>
            <Image 
              source={{ uri: `file://${value.imagePath}` }}
              style={{ alignSelf: 'center', height: 200, width: 200,}}
              resizeMode='stretch'
            />
          </View>
          <Text>{value.category}</Text>
          <Text>Total Expenses: ${value.totalExpenses}</Text>
        </Card>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      onRefresh={props.refreshReceipts}
      refreshing={Object.entries(props.receipts).length === 0 && props.isLoading}
      data={Object.entries(props.receipts)}
      renderItem={onRenderItems}
      keyExtractor={item => item[0]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  }
})