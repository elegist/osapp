/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TaskManager from './src/container/TaskManager';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent("AssessmentTaskManager", () => TaskManager);
