import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimentions';

import AntDesign from 'react-native-vector-icons/AntDesign';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
const FormInput = ({ labelValue, placeholderText, iconType, ...rest }) => {
  let [fontsLoaded] = useFonts({
    'notoSansKR-bold': require('../assets/fonts/NotoSansKR-Bold.ttf'),
    'notoSansKR-regular': require('../assets/fonts/NotoSansKR-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.iconStyle}>
          <AntDesign name={iconType} size={25} color="#666" />
        </View>
        <TextInput
          value={labelValue}
          style={styles.input}
          numberOfLines={1}
          placeholder={placeholderText}
          placeholderTextColor="#666"
          {...rest}
        />
      </View>
    );
  }
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 10,
    width: '70%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'notoSansKR-regular',
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});
