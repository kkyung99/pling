import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { windowHeight } from '../utils/Dimentions';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
const FormButton = ({ buttonTitle, ...rest }) => {
  let [fontsLoaded] = useFonts({
    'notoSansKR-bold': require('../assets/fonts/NotoSansKR-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <TouchableOpacity style={styles.buttonContainer} {...rest}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    );
  }
};
export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 20,
    width: '70%',
    height: windowHeight / 15,
    backgroundColor: '#3b6566',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'notoSansKR-bold',
  },
});
