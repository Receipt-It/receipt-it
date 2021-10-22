import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput
} from 'react-native';

import { SearchBar } from 'react-native-elements';

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';

export default class SearchScreen extends React.Component {
  // const rnsUrl = 'https://reactnativestarter.com';
  // const handleClick = () => {
  //   Linking.canOpenURL(rnsUrl).then(supported => {
  //     if (supported) {
  //       Linking.openURL(rnsUrl);
  //     } else {
  //       console.log(`Don't know how to open URI: ${rnsUrl}`);
  //     }
  //   });
  // };
   state = {
      search: '',
    };

    updateSearch = (search) => {
      this.setState({ search });
    };

  render() {
  const { search } = this.state;

  return (
    <View style={styles.container}>
           <SearchBar
                   inputStyle={{backgroundColor: 'white'}}
                   leftIconContainerStyle={{backgroundColor: 'white'}}
                   inputContainerStyle={{backgroundColor: 'white'}}
                   containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
                   placeholderTextColor={'#g5g5g5'}
                   placeholder={'Pritish Vaidya'}
                  placeholder="Search Here..."
                  onChangeText={this.updateSearch}
                  value={search}
                />
        <View style={styles.section}>
          <Text color="#19e7f7" size={15}>
            The smartest Way to build your mobile app
          </Text>
          <Text size={30} bold white style={styles.title}>
            React Native Starter
          </Text>
        </View>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colors.bluish,
      paddingHorizontal: 15,
      paddingTop: 20,
    },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionLarge: {
    flex: 2,
    justifyContent: 'space-around',
  },
  sectionHeader: {
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: 'center',
  },
  description: {
    padding: 15,
    lineHeight: 25,
  },
  titleDescription: {
    color: '#19e7f7',
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  title: {
    marginTop: 30,
  },
  price: {
    marginBottom: 5,
  },
  priceLink: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
});
