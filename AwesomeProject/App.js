import React from 'react';
import { StatusBar } from 'react-native';

import { RootNavigator } from './RootNavigator';

const App = () => {
  return (
    <>
      <StatusBar hidden />
      <RootNavigator />
    </>
  );
};

export default App;