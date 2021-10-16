import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PlantSelectScreen from '../screens/PlantSelectScreen';
import PlantSelectDetailScreen from '../screens/PlantSelectDetailScreen';
import QuestionCards from '../screens/QuestionCards';
import NoQuestionCards from '../screens/NoQuestionCards';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
  Platform,
  Text,
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { CommonActions } from '@react-navigation/native';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const HomeStack = createStackNavigator();
const CalendarStack = createStackNavigator();
const PlantStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const MainTab = ({ navigation }) => {
  const { check } = useContext(AuthContext);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: 'white',
        inactiveTintColor: '#D3D3D3',
        keyboardHidesTabBar: true,
        style: {
          position: 'absolute',
          backgroundColor: '#355F5D',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: Platform.OS === 'ios' ? 96 : 96,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome
              name="leaf"
              color={color}
              size={30}
              style={{
                alignSelf: 'flex-end',
                paddingRight: '10%',
                marginTop: Platform.OS === 'ios' ? 15 : 0,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PlantSelectScreen"
        component={PlantStackScreen}
        options={{
          tabBarLabel: 'PlantSelect',
          tabBarIcon: ({ color, size }) => (
            <TouchableOpacity
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: Platform.OS === 'ios' ? 15 : 0,
              }}
              onPress={() => {
                if (check.length > 3) {
                  return Alert.alert(
                    '알림',
                    '식물은 4개까지만 등록 가능합니다'
                  );
                } else {
                  return navigation.navigate('PlantSelectScreen');
                }
              }}
            >
              <FontAwesome name="plus" color={color} size={25} />
            </TouchableOpacity>
          ),
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarStackScreen}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar-blank"
              color={color}
              size={30}
              style={{
                alignSelf: 'flex-start',
                paddingLeft: '10%',
                marginTop: Platform.OS === 'ios' ? 15 : 0,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;

const HomeStackScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    'bowlbyOne-regular': require('../assets/fonts/BowlbyOne-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTransparent: true,
            title: 'PLING',
            headerTintColor: '#2F5233',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'bowlbyOne-regular',
              fontSize: 25,
            },

            headerRight: () => (
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="#F2F2F2"
                color="#2F5233"
                onPress={() => navigation.openDrawer()}
              ></Icon.Button>
            ),
          }}
        />
      </HomeStack.Navigator>
    );
  }
};

const PlantStackScreen = ({ navigation }) => (
  <PlantStack.Navigator>
    <PlantStack.Screen
      name="PlantSelectScreen"
      component={PlantSelectScreen}
      options={() => ({
        title: '',
        headerStyle: {
          backgroundColor: '#CCE6DD',
          shadowColor: '#CCE6DD',
          elevation: 0,
        },
        headerLeft: () => (
          <View style={{ marginLeft: 10 }}>
            <FontAwesome.Button
              name="long-arrow-left"
              size={25}
              backgroundColor="#CCE6DD"
              color="gray"
              onPress={() => navigation.goBack()}
            />
          </View>
        ),
      })}
    />
    <PlantStack.Screen
      name="PlantSelectDetailScreen"
      component={PlantSelectDetailScreen}
      options={{ headerShown: false }}
    />
  </PlantStack.Navigator>
);

const CalendarStackScreen = ({ navigation, route }) => {
  const tabHiddenRoutes = ['QuestionCards', 'NoQuestionCards'];
  useEffect(() => {
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [navigation, route]);

  let [fontsLoaded] = useFonts({
    'bowlbyOne-regular': require('../assets/fonts/BowlbyOne-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <CalendarStack.Navigator>
        <CalendarStack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            headerTransparent: true,
            title: 'PLING',
            headerTintColor: '#2F5233',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'bowlbyOne-regular',
              fontSize: 25,
            },
            headerRight: () => (
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="#FFFAEF"
                color="#2F5233"
                onPress={() => navigation.openDrawer()}
              ></Icon.Button>
            ),
          }}
        />
        <CalendarStack.Screen
          name="QuestionCards"
          component={QuestionCards}
          options={() => ({
            title: '',
            headerStyle: {
              backgroundColor: '#C9E5D5',
              shadowColor: '#C9E5D5',
              elevation: 0,
            },
            headerLeft: () => (
              <View style={{ marginLeft: 10 }}>
                <FontAwesome.Button
                  name="long-arrow-left"
                  size={25}
                  backgroundColor="#C9E5D5"
                  color="gray"
                  onPress={() =>
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Calendar' }],
                      })
                    )
                  }
                />
              </View>
            ),
          })}
        />
        <CalendarStack.Screen
          name="NoQuestionCards"
          component={NoQuestionCards}
          options={() => ({
            title: '',
            headerStyle: {
              backgroundColor: '#C9E5D5',
              shadowColor: '#C9E5D5',
              elevation: 0,
            },
            headerLeft: () => (
              <View style={{ marginLeft: 10 }}>
                <FontAwesome.Button
                  name="long-arrow-left"
                  size={25}
                  backgroundColor="#C9E5D5"
                  color="gray"
                  onPress={() =>
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Calendar' }],
                      })
                    )
                  }
                />
              </View>
            ),
          })}
        />
      </CalendarStack.Navigator>
    );
  }
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      widht: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10,
  },
});
