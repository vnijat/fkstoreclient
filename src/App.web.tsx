import {NavigationContainer} from '@react-navigation/native';
import {Text, View, } from 'react-native';
import {RouteNames} from './enums/routes';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './types/navigation';
import LoginView from './views/loginView';
import {RootNavigation} from './modules/navigation/rootNavigation';
import {navigationRef} from './modules/navigation/rootNavigation.web';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import CustomToastComponent, {IToastOptions} from './components/customToastComponent';
import {ToastProvider} from 'react-native-toast-notifications';
import store, {persistor} from './modules/redux/store';

const linking = {
    prefixes: [
        /* your linking prefixes */
    ],
    config: {
        screens: {
            [RouteNames.LOGIN]: '/login',
            [RouteNames.WAREHOUSE]: '/warehouse',
            [RouteNames.ORDERS]: '/orders',
            [RouteNames.PROJECTS]: '/projects',
            [RouteNames.CLIENTS]: '/clients',
            [RouteNames.PURCHASES]: '/purchases',
            [RouteNames.TRACKVIEW]: '/trackview',
            [RouteNames.TRANSFERS]: '/transfers',
        }
        /* configuration for matching screens with paths */
    },
};


function App() {
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
                    <NavigationContainer linking={linking} ref={navigationRef} fallback={<Text>Loading...</Text>}>
                        <RootNavigation />
                    </NavigationContainer>
                </ToastProvider>
            </PersistGate>
        </Provider>
        // <View style={{flex: 1, backgroundColor: 'red'}}>
        //     <Text style={{color: 'Blue'}}>Hello World</Text>
        // </View>

    );
}

export default App;