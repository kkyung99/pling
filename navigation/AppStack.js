import React from "react";
import { DrawerContent } from "../screens/DrawerContent";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainTab from "./MainTab";

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerPosition={"right"}
      drawerType="slide"
      drawerStyle={{ width: 200, backgroundColor: "#E9F5E4" }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="HomeDrawer" component={MainTab} />
    </Drawer.Navigator>
  );
};

export default AppStack;
