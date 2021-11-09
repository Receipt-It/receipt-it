import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import Permissions from 'react-native-permissions';
import RNFS from 'react-native-fs';
import { Image } from 'react-native-elements';
import {
  MenuProvider,
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';

export default function ReceiptHistoryScreen(props) {
  
  const [storageAllowed, setStorageAllowed] = useState(false);

  useEffect(() => {
    async function request() {
      const result = await Permissions.requestMultiple(['android.permission.READ_EXTERNAL_STORAGE', 'android.permission.WRITE_EXTERNAL_STORAGE']);

      if (result["android.permission.READ_EXTERNAL_STORAGE"] ==='granted' && result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted') setStorageAllowed(true);
    }

    request();
  }, [])

  const onEditReceipt = (key) => {
    Alert.alert('Edit Receipt', key,  [{ text: "OK" }], {cancelable: true});
  }

  const onDeleteReceipt = (key) => {
    if (storageAllowed) {
      // try to read the current data file
      RNFS.readFile(path, 'utf8')
        // add the new data 
        .then((currentData) => {
          const parsedData = JSON.parse(currentData);

          console.log(parsedData);

          delete parsedData[key];
          
          console.log(parsedData)
        

          RNFS.unlink(path)
          .then(() => {
            RNFS.writeFile(path, JSON.stringify(parsedData), 'utf8')
              .then(() => {
                Alert.alert("Receipt Deleted", "Successfully deleted receipt", [{ text: "OK" }], {cancelable: true});

                props.refreshReceipts()
              })
          });
        })
    }
  }

  const onRenderItems = ({ item }) => {
    const [key, value] = item;
  
    const date = new Date(value.date);

    return (
      <View key={key} style={styles.cardContainer}>
        <View style={styles.cardTitle}>
          <View style={styles.cardTitleText}>
            <Text>{date.toDateString()}</Text>
            <Text>{value.companyName}</Text>
          </View>
          <Menu onSelect={menuValue => menuValue === 'edit' ? onEditReceipt(key) : onDeleteReceipt(key)}>
            <MenuTrigger text='Edit' />
            <MenuOptions>
              <MenuOption value='edit' text='Edit Receipt' />
              <MenuOption value='delete' text='Delete Receipt' />
            </MenuOptions>
          </Menu>
        </View>
        <View style={styles.cardDivider} />
        <View style={styles.cardBody}>
          <View>
            <Image
              source={{ uri: `file://${value.imagePath}`}}
              style={styles.cardImage}
              resizeMode='stretch'
            />
          </View>
          <View style={styles.cardBodyTextContainer}>
            <Text>Category: {value.category}</Text>
            <Text>Total Expenses: ${value.totalExpenses}</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <MenuProvider>
      <FlatList
        style={styles.container}
        onRefresh={props.refreshReceipts}
        refreshing={Object.entries(props.receipts).length === 0 && props.isLoading}
        data={Object.entries(props.receipts)}
        renderItem={onRenderItems}
        keyExtractor={item => item[0]}
      />
    </MenuProvider>
  );
}
const path = `${RNFS.ExternalDirectoryPath}/data.txt`;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  cardContainer: {
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
  cardImage: {
    alignSelf: 'center',
    height: 200,
    width: 200,
  },
  cardBodyTextContainer: {
    paddingTop: 10
  }
})