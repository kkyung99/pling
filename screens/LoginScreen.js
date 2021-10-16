import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';
import { windowHeight } from '../utils/Dimentions';
import * as Animatable from 'react-native-animatable';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const LoginScreen = ({ navigation }) => {
  const { googleLogin, facebookLogin, loading } = useContext(AuthContext);

  let [fontsLoaded] = useFonts({
    'notoSansKR-bold': require('../assets/fonts/NotoSansKR-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        {loading ? (
          <Animatable.View
            style={{
              backgroundColor: '#00000099',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
            }}
          >
            <Animatable.Text
              animation="bounce"
              iterationCount={'infinite'}
              direction="normal"
              style={{
                color: '#fff',
                fontSize: 25,
                fontFamily: 'notoSansKR-bold',
              }}
            >
              Loading...
            </Animatable.Text>
          </Animatable.View>
        ) : null}
        <View style={styles.header}>
          <Image
            source={require('../assets/logo_main.png')}
            style={styles.logo}
          />
        </View>

        <View style={styles.footer}>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: '#F2F2F2',
            }}
          />
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              borderTopLeftRadius: 100,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 30,
                marginTop: 40,
                fontFamily: 'notoSansKR-bold',
              }}
            >
              Login
            </Text>
            <View style={styles.btnContainer}>
              <SocialButton
                buttonTitle="Sign In with Facebook"
                btnType="facebook"
                color="#4867aa"
                backgroundColor="#e6eaf4"
                onPress={() => {
                  facebookLogin();
                }}
              />
              <SocialButton
                buttonTitle="Sign In with Google"
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
                onPress={() => {
                  googleLogin();
                }}
              />
            </View>

            <TouchableOpacity
              style={styles.forgotButton}
              onPress={() => navigation.navigate('Signup')}
            ></TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    height: 0.61 * windowHeight,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 100,
  },
  logo: {
    height: '45%',
    width: '45%',
    resizeMode: 'contain',
  },
  loading: {
    width: '25%',
    height: '25%',
    resizeMode: 'contain',
  },
  footer: {
    flex: 1,
  },
  btnContainer: {
    flexDirection: 'column',
    margin: 20,
    marginTop: 40,
    paddingHorizontal: 30,
  },
});
