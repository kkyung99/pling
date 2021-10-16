import React from 'react';
import { useContext } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Drawer } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { AuthContext } from '../navigation/AuthProvider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { windowWidth } from '../utils/Dimentions';

export function DrawerContent(props) {
  const { logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#EBEBEB" /> */}

      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Image
            source={require('../assets/logo_main.png')}
            style={styles.logo}
          />

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome name="leaf" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="calendar-outline" color={color} size={26} />
              )}
              label="Calendar"
              onPress={() => {
                props.navigation.navigate('Calendar');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="exit-to-app" color={color} size={26} />
              )}
              label="Log Out"
              onPress={() => {
                logout();
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  logo: {
    height: 100,
    width: windowWidth * 0.5,
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 20,
  },
});
