import { createStackNavigator } from '@react-navigation/stack';
import React, { FC } from 'react';
import ConfigsView from '../../mobile/views/configsView';
import { DrawerNavigation } from './drawerNavigation';

export const RootNavigation: FC<any> = () => {
  const Stack = createStackNavigator();
  return (
    <>
      <Stack.Navigator initialRouteName="drawer" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="drawer" component={DrawerNavigation} />
      </Stack.Navigator>
    </>

  );
};
