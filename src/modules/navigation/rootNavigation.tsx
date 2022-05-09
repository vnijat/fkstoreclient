import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import React, { FC } from 'react';
import { AddItemView } from '../../views/addItemView';
import { HomeView } from '../../views/homeView';
import { OrderView } from '../../views/orderView';
import { DrawerNavigation } from './drawerNavigation';

export const RootNavigation: FC<any> = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Drawer" screenOptions={{ headerShown: false}} >
      <Stack.Screen name="Drawer" component={DrawerNavigation} />
    </Stack.Navigator>
  );
};
