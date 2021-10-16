import React from 'react';
import { DrawerContent } from '../screens/DrawerContent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTab from './MainTab';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerPosition={'right'}
      drawerType="back"
      drawerStyle={{ width: 200, backgroundColor: '#F2F2F2' }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="HomeDrawer" component={MainTab} />
    </Drawer.Navigator>
  );
};

export default AppStack;
