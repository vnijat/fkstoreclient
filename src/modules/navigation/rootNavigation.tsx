import React, {FC} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RouteNames} from '../../enums/routes';
import ConfigsView from '../../mobile/views/configsView';
import ProductInfoView from '../../mobile/views/productInfoView';
import {RootStackMobileParamList} from '../../types/navigation';
import {Colors} from '../../utils/colors';
import HeaderLeft from './components/headerLeft';
import {DrawerNavigation} from './drawerNavigation';
import {createNavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import LoginView from '../../mobile/views/loginView';
import {StatusBar} from 'react-native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import OrderDetailsView from '../../mobile/views/orderDetailsView';

export const navigationRef = createNavigationContainerRef();
const Stack = createStackNavigator<RootStackMobileParamList>();

export const RootNavigation: FC<any> = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <StatusBar backgroundColor={Colors.CARD_COLOR} />
        <Stack.Navigator initialRouteName={RouteNames.DRAWER}
          screenOptions={({navigation}) => ({
            headerShown: false,
            headerStyle: {backgroundColor: Colors.CARD_COLOR, shadowColor: Colors.METALLIC_GOLD, shadowOffset: {height: 7, width: 0}, shadowRadius: 9, shadowOpacity: 0.5, elevation: 16},
            headerTitleStyle: {color: Colors.DEFAULT_TEXT_COLOR},
            headerTitleAlign: 'center',
            headerLeft: () => <HeaderLeft navigation={navigation} />,
          })} >
          {
            !user ?
              <>
                <Stack.Screen name={RouteNames.LOGIN} component={LoginView} />
              </>
              :
              <>
                <Stack.Screen name={RouteNames.DRAWER} component={DrawerNavigation} />
                <Stack.Screen name={RouteNames.PRODUCT_INFO} component={ProductInfoView}
                  options={{
                    presentation: 'transparentModal',
                    headerShown: true,
                  }}
                />
                <Stack.Screen name={RouteNames.ORDER_DETAILS} component={OrderDetailsView}
                  options={{
                    headerTitle: () => null,
                    presentation: 'card',
                    headerShown: true,
                  }}
                />
              </>
          }
        </Stack.Navigator>
      </BottomSheetModalProvider >
    </GestureHandlerRootView>
  );
};
