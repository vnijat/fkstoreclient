import { createStackNavigator } from '@react-navigation/stack';
import React, { FC } from 'react';
import { DrawerNavigation } from './drawerNavigation';

export const RootNavigation: FC<any> = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Drawer" screenOptions={{ headerShown: false}} >
      <Stack.Screen name="Drawer" component={DrawerNavigation} />
    </Stack.Navigator>
  );
};
