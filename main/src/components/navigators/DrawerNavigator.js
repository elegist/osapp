import React from 'react';
import CustomDrawer from '../CustomDrawer';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../../screens/HomeScreen';
import OsaScreen from '../../screens/OsaScreen';
import globalStyles from '../../styles/GlobalStyleSheet';
import ExamplesScreen from '../../screens/osa_tasks_screens/ExamplesScreen';

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
          drawerLabelStyle: globalStyles.textParagraph,
        }}
      />
      <Drawer.Screen
        name="testDrawer"
        component={OsaScreen}
        options={{
          title: 'OSA',
          drawerLabelStyle: globalStyles.textParagraph,
        }}
      />
      <Drawer.Screen
        name="examplesDrawer"
        component={ExamplesScreen}
        options={{
          title: 'Studienprojekte',
          drawerLabelStyle: globalStyles.textParagraph,
        }}
        initialParams={{
          source: 'drawer',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
