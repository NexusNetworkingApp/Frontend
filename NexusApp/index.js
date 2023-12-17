let debug = require('debug');

debug.enable('axios');


import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { AuthProvider } from './AuthContext';

const RootComponent = () => (
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// Register the root component with the app name
AppRegistry.registerComponent(appName, () => RootComponent);
