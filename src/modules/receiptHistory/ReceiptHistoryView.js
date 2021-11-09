import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Modal } from 'react-native';
import RNFS from 'react-native-fs';
import { Image } from 'react-native-elements';

const noReceiptImage = require('../../../assets/images/no-receipt.png');

export default function ReceiptHistoryScreen(props) {

  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState('')

  const onCloseImage = () => {
    setShowImage(!showImage);
    setSelectedImage('');
  }

  const onShowImage = (uri) => {
    setShowImage(!showImage);
    setSelectedImage(uri)
  }
  
  const onDeleteReceipt = (key) => {
    // try to read the current data file
    RNFS.readFile(path, 'utf8')
      // add the new data 
      .then((currentData) => {
        const parsedData = JSON.parse(currentData);

        delete parsedData[key];        

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

  const onRenderItems = ({ item }) => {
    const [key, value] = item;
  
    const date = new Date(value.date);
    const imageUri = `file://${value.imagePath}`;
    
    return (
      <View key={key} style={styles.cardContainer}>
        <View style={styles.cardTitle}>
          <View style={styles.cardTitleText}>
            <Text>{date.toDateString()}</Text>
            <Text>{value.companyName}</Text>
          </View>
          <TouchableOpacity
            onPress={() => onDeleteReceipt(key)}
          >
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardDivider} />
        <View style={styles.cardBody}>
          <View style={styles.cardImageContainer}>
            {
              value.imagePath !== '' ? (
                <Image
                  source={{ uri: imageUri }}
                  style={styles.cardImage}
                  onPress={() => onShowImage(imageUri)}
                  resizeMode='stretch'
                />
              ) : (
                <Image
                  source={noReceiptImage}
                  style={styles.cardImage}
                />
              )
            }
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
    <>
      <FlatList
        style={styles.container}
        onRefresh={props.refreshReceipts}
        refreshing={Object.entries(props.receipts).length === 0 && props.isLoading}
        data={Object.entries(props.receipts)}
        renderItem={onRenderItems}
        keyExtractor={item => item[0]}
      />
      <Modal
        visible={showImage}
        onRequestClose={onCloseImage}
      >
        <Image
          source={{ uri: selectedImage }}
          style={styles.modalImage}
          resizeMode='contain'
        />
      </Modal>
    </>

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
  cardImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    height: 200,
    width: 200,
  },
  cardBodyTextContainer: {
    paddingTop: 10
  },
  modalImage: {    
    width: '100%',
    height: '100%',
  },
})