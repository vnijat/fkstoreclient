import { createStackNavigator } from '@react-navigation/stack';
import React, { FC, useEffect } from 'react';
import SettingsAddEditModal from '../../containers/settingsAddEditModal';
import { useAppDispatch } from '../redux/store';
import { DrawerNavigation } from './drawerNavigation';

export const RootNavigation: FC<any> = () => {
  const Stack = createStackNavigator();
  return (
    <>
      <Stack.Navigator initialRouteName="Drawer" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Drawer" component={DrawerNavigation} />
      </Stack.Navigator>
      <SettingsAddEditModal />
    </>

  );
};
