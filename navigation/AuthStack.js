import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

AsyncStorage.clear();
const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch == true) {
    routeName = 'Onboarding';
  } else {
    routeName = 'Login';
  }

  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ header: () => null }}

      // options={({ navigation }) => ({
      //   title: '',
      //   headerStyle: {
      //     backgroundColor: '#F2F2F2',
      //     shadowColor: '#F2F2F2',
      //     elevation: 0,
      //   },
      //   headerLeft: () => (
      //     <View style={{ marginLeft: 10 }}>
      //       <FontAwesome.Button
      //         name="long-arrow-left"
      //         size={25}
      //         backgroundColor="#F2F2F2"
      //         color="gray"
      //         onPress={() => navigation.navigate('Login')}
      //       />
      //     </View>
      //   ),
      // })}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
