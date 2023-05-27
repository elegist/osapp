import React from 'react';
import CustomDrawer from '../CustomDrawer';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../../screens/HomeScreen';
import OsaScreen from '../../screens/OsaScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerActiveBackgroundColor: '#8CBA45',
        drawerActiveTintColor: 'white',
      }}>
      <Drawer.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name="testDrawer"
        component={OsaScreen}
        options={{title: 'Testscreen'}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
