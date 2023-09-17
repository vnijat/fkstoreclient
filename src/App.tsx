
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import React, {FC} from 'react';
import {RootNavigation, navigationRef} from './modules/navigation/rootNavigation';
import {LogBox, View} from "react-native";
import {Provider} from 'react-redux';
import {persistor, store} from './modules/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import ToastConfig from './configs/toast';

LogBox.ignoreLogs(["EventEmitter.removeListener", 'Reanimated 2']);



const App: FC<any> = () => {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer ref={navigationRef} >
          <RootNavigation />
        </NavigationContainer>
      </PersistGate>
      <Toast autoHide visibilityTime={3000} topOffset={10} config={ToastConfig} />
    </Provider>
  );
};

export default App;
