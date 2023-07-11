import React from 'react';
import CustomDrawer from '../CustomDrawer';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../../screens/HomeScreen';
import OsaScreen from '../../screens/OsaScreen';
import globalStyles from '../../styles/GlobalStyleSheet';
import ExamplesScreen from '../../screens/osa_tasks_screens/ExamplesScreen';
import { SummaryScreen } from '../../screens/SummaryScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        overlayColor: 'rgba(0, 0, 0, 0.85)',
        drawerActiveBackgroundColor: '#8CBA45',
        drawerInactiveBackgroundColor: 'rgba(140, 186, 69, 0.1)',
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
      <Drawer.Screen
        name="osaDrawer"
        component={OsaScreen}
        options={{
          title: 'OSA beginnen',
          drawerLabelStyle: globalStyles.textParagraph,
        }}
      />
      <Drawer.Screen
        name="summaryDrawer"
        component={SummaryScreen}
        options={{ 
          title: 'Zusammenfassung',
          drawerLabelStyle: globalStyles.textParagraph,
          drawerItemStyle: { height: 0 }
         }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
