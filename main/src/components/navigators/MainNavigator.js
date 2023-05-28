import React, { Component } from 'react'
import DrawerNavigator from './DrawerNavigator'
import OsaScreen from '../../screens/OsaScreen'
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SummaryScreen from '../../screens/SummaryScreen';

export class MainNavigator extends Component {


  render() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="drawerNavigator"
              component={DrawerNavigator}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="osaScreen"
              component={OsaScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen 
              name="summaryScreen"
              component={SummaryScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
    )
  }
}

export default MainNavigator