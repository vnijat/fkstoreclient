import {createStackNavigator} from '@react-navigation/stack';
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

export const navigationRef = createNavigationContainerRef();


export const RootNavigation: FC<any> = () => {
  const Stack = createStackNavigator<RootStackMobileParamList>();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Stack.Navigator initialRouteName={RouteNames.DRAWER}
        screenOptions={({navigation}) => ({
          headerShown: false,
          headerStyle: {backgroundColor: Colors.CARD_COLOR, shadowColor: Colors.METALLIC_GOLD, shadowOffset: {height: 7, width: 0}, shadowRadius: 9, shadowOpacity: 0.5, elevation: 16},
          headerTitleStyle: {color: Colors.DEFAULT_TEXT_COLOR},
          headerTitleAlign: 'center',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
        })} >
        <Stack.Screen name={RouteNames.DRAWER} component={DrawerNavigation}
        />
        <Stack.Screen name={RouteNames.PRODUCT_INFO} component={ProductInfoView}
          options={{
            presentation: 'transparentModal',
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </GestureHandlerRootView>

  );
};
