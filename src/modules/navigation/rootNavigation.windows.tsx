import { createStackNavigator } from '@react-navigation/stack';
import React, { FC, useEffect } from 'react';
import SettingsAddEditModal from '../../containers/settingsAddEditModal/index.windows';
import { RouteNames } from '../../enums/routes';
import { RootStackParamList } from '../../types/navigation';
import { useAppDispatch } from '../redux/store';
import { DrawerNavigation } from './drawerNavigation.windows';

export const RootNavigation: FC<any> = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <>
      <Stack.Navigator initialRouteName={RouteNames.DRAWER} screenOptions={{ headerShown: false }} >
        <Stack.Screen name={RouteNames.DRAWER} component={DrawerNavigation} />
      </Stack.Navigator>
      <SettingsAddEditModal />
    </>

  );
};
