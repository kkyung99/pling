import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { windowHeight } from '../utils/Dimentions';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignupScreen = ({ navigation }) => {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  let [fontsLoaded] = useFonts({
    'notoSansKR-bold': require('../assets/fonts/NotoSansKR-Bold.ttf'),
    'notoSansKR-regular': require('../assets/fonts/NotoSansKR-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
        style={{ backgroundColor: 'white' }}
      >
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
                marginTop: windowHeight * 0.05,
                marginBottom: windowHeight * 0.03,
                fontFamily: 'notoSansKR-bold',
              }}
            >
              Sign up
            </Text>
            <FormInput
              labelValue={email}
              onChangeText={(userEmail) => setEmail(userEmail)}
              placeholderText="Email"
              iconType="user"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormInput
              labelValue={password}
              onChangeText={(userPassword) => setPassword(userPassword)}
              placeholderText="Password"
              iconType="lock"
              secureTextEntry={true}
            />
            <FormButton
              buttonTitle="SIGN UP"
              onPress={() => register(email, password)}
            />
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.navButtonText}>Have an account? Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}
            ></TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  header: {
    height: 0.4 * windowHeight,
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
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    textAlign: 'center',
    margin: 30,
    fontSize: 15,
    fontWeight: '500',
    color: '#2e64e5',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    color: 'grey',
    textAlign: 'center',
  },
});
