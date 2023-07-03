/**
 * OSApp - Main entry point for React Native.
 * Authors: Robin Patzak, Armin Prinz
 * Please refer to the official documentation.
 */
import * as React from 'react';

// Navigator
import MainNavigator from './src/components/navigators/MainNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): JSX.Element {

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <MainNavigator></MainNavigator>
    </GestureHandlerRootView>
  );
}
export default App;
