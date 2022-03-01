import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import React, { FC, useRef } from 'react';
import { RootNavigation } from './modules/navigation/rootNavigation';
import { LogBox, View } from "react-native";
import { Provider } from 'react-redux';
import { store } from './modules/redux/store';

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const App: FC<any> = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
