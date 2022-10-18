
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import React, { FC, useRef } from 'react';
import { RootNavigation } from './modules/navigation/rootNavigation';
import { LogBox, View } from "react-native";
import { Provider } from 'react-redux';
import { store } from './modules/redux/store';
import { ToastProvider } from 'react-native-rooster';

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const App: FC<any> = () => {

  return (
    <ToastProvider>
      <Provider store={store}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </Provider>
    </ToastProvider>
  );
};

export default App;
