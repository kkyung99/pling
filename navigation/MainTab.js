import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import PlantSelectScreen from "../screens/PlantSelectScreen";
import PlantSelectDetailScreen from "../screens/PlantSelectDetailScreen";
import QuestionCards from "../screens/QuestionCards";

const HomeStack = createStackNavigator();
const CalendarStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const MainTab = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: "#AABCA6",
      inactiveTintColor: "gray",
      style: {
        height: 65,
      },
      showLabel: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="leaf" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Calendar"
      component={CalendarStackScreen}
      options={{
        tabBarLabel: "Calendar",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="calendar-blank"
            color={color}
            size={26}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTab;

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: "PLING",
        headerTintColor: "#AABCA6",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerRight: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fff"
            color="#AABCA6"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
    <HomeStack.Screen
      name="PlantSelectScreen"
      component={PlantSelectScreen}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      name="PlantSelectDetailScreen"
      component={PlantSelectDetailScreen}
      options={{ headerShown: false }}
    />
  </HomeStack.Navigator>
);

const CalendarStackScreen = ({ navigation }) => (
  <CalendarStack.Navigator>
    <CalendarStack.Screen
      name="Calendar"
      component={CalendarScreen}
      options={{
        title: "PLING",
        headerTintColor: "#AABCA6",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerRight: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fff"
            color="#AABCA6"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
    <CalendarStack.Screen
      name="QuestionCards"
      component={QuestionCards}
      options={{
        title: "PLING",
        headerTintColor: "#AABCA6",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
  </CalendarStack.Navigator>
);
