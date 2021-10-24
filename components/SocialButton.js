import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { windowHeight } from '../utils/Dimentions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const SocialButton = ({
  buttonTitle,
  btnType,
  color,
  backgroundColor,
  ...rest
}) => {
  let bgColor = backgroundColor;

  let [fontsLoaded] = useFonts({
    'notoSansKR-bold': require('../assets/fonts/NotoSansKR-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <TouchableOpacity
        style={[styles.buttonContainer, { backgroundColor: bgColor }]}
        {...rest}
      >
        <View style={styles.iconWrapper}>
          <FontAwesome
            name={btnType}
            style={styles.icon}
            size={22}
            color={color}
          />
        </View>
        <View style={styles.btnTxtWrapper}>
          <Text style={[styles.buttonText, { color: color }]}>
            {buttonTitle}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
};

export default SocialButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height: windowHeight / 15,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 60,
    marginBottom: 10,
  },
  iconWrapper: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  btnTxtWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'notoSansKR-bold',
  },
});
