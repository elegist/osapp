/**
 * OSApp - Main entry point for React Native.
 * Authors: Robin Patzak, Armin Prinz
 * Please refer to the official documentation.
 */
import * as React from 'react';

// Navigator
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/components/navigators/DrawerNavigator';

function App(): JSX.Element {

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
export default App;
