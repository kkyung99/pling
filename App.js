import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, Text, LogBox } from 'react-native';
import Providers from './navigation';
import init from './service/firebase';

init();
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#EBEBEB" />
      <Providers />
    </SafeAreaProvider>
  );
};

export default App;
