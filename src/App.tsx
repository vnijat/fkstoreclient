
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import React, { FC, useRef } from 'react';
import { RootNavigation } from './modules/navigation/rootNavigation';
import { LogBox, View } from "react-native";
import { Provider } from 'react-redux';
import { persistor, store } from './modules/redux/store';
import { ToastProvider } from 'react-native-rooster';
import { PersistGate } from 'redux-persist/integration/react';

LogBox.ignoreLogs(["EventEmitter.removeListener", 'Reanimated 2']);

const App: FC<any> = () => {

  return (
    <ToastProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </ToastProvider>
  );
};

export default App;
