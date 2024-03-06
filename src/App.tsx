
import React, {FC} from 'react';
import {RootNavigation, navigationRef} from './modules/navigation/rootNavigation';
import {LogBox, View} from "react-native";
import {Provider, } from 'react-redux';
import store, {persistor} from './modules/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {ToastProvider} from 'react-native-toast-notifications';
import CustomToastComponent, {IToastOptions} from './components/customToastComponent';
import {NavigationContainer} from '@react-navigation/native';

LogBox.ignoreLogs(["EventEmitter.removeListener", 'Reanimated 2']);



const App: FC<any> = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ToastProvider
          placement='top'
          offsetTop={30}
          animationType={'slide-in'}
          duration={3000}
          renderToast={(toastOptions) => <CustomToastComponent toastOptions={toastOptions as IToastOptions} />}
        >
          {/* <NavigationContainer  ref={navigationRef} >
            <RootNavigation />
          </NavigationContainer> */}
          <View style={{flex: 1, backgroundColor: 'red'}}>
          </View>
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
