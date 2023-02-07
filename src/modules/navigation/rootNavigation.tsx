import { createStackNavigator } from '@react-navigation/stack';
import React, { FC } from 'react';
import ConfigsView from '../../mobile/views/configsView';
import ProductInfoView from '../../mobile/views/productInfoView';
import { Colors } from '../../utils/colors';
import HeaderLeft from './components/headerLeft';
import { DrawerNavigation } from './drawerNavigation';

export const RootNavigation: FC<any> = () => {
  const Stack = createStackNavigator();
  return (
    <>
      <Stack.Navigator initialRouteName="drawer"
        screenOptions={({ navigation }) => ({
          headerShown: false,
          headerStyle: { backgroundColor: Colors.CARD_COLOR, shadowColor: Colors.METALLIC_GOLD, shadowOffset: { height: 7, width: 0 }, shadowRadius: 9, shadowOpacity: 0.5, elevation: 16 },
          headerTitleStyle: { color: Colors.DEFAULT_TEXT_COLOR },
          headerTitleAlign: 'center',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
        })} >
        <Stack.Screen name="drawer" component={DrawerNavigation}
        />
        <Stack.Screen name="Info" component={ProductInfoView}
          options={{
            presentation: 'transparentModal',
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </>

  );
};
