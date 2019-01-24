/** @format */
import 'core-js';
import 'react-devtools';
import 'react-native-console-time-polyfill';
import { AppRegistry } from 'react-native';
import Root from './app/root';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => Root);
