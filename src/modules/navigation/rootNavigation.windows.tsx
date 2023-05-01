import { createNavigationContainerRef, NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { FC, useEffect, useMemo, useState } from 'react';
import SideBar from '../../containers/customDrawer';
import CustomDrawer from '../../containers/customDrawer';
import SettingsAddEditModal from '../../containers/settingsAddEditModal/index.windows';
import { RouteNames } from '../../enums/routes';
import { RootStackParamList } from '../../types/navigation';
import { ClientsView } from '../../views/clientsView';
import InventoryTrackView from '../../views/inventoryTrackView';
import { OrderView } from '../../views/orderView';
import ProjectsView from '../../views/projectsView';
import PurchaseView from '../../views/purchaseView';
import WareHouseView from '../../views/warehouseView';
import AddEditItemModal from '../../views/warehouseView/components/addEditItemModal';


export const navigationRef = createNavigationContainerRef();

export const RootNavigation: FC<any> = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  const [event, setEvent] = useState();

  navigationRef.addListener('state', (event) => setEvent(event));

 const renderSideBar = useMemo(() => {
    if (navigationRef.getRootState()) {
      const navigation = navigationRef.current;
      const routeNames = navigationRef.current?.getRootState().routeNames;
      const currentRoute = navigationRef.current?.getCurrentRoute()?.name;
      return <SideBar navigation={navigation} routeNames={routeNames!} currentRoute={currentRoute!} />;
    } else { 
      return null;
    }
  }, [event]);



  return (
    <>
      {renderSideBar}
      <Stack.Navigator initialRouteName={RouteNames.WAREHOUSE} screenOptions={{ headerShown: false }} >
        <Stack.Screen name={RouteNames.WAREHOUSE} component={WareHouseView} />
        <Stack.Screen name={RouteNames.CLIENTS} component={ClientsView} />
        <Stack.Screen name={RouteNames.PROJECTS} component={ProjectsView} />
        <Stack.Screen name={RouteNames.ORDERS} component={OrderView} />
        <Stack.Screen name={RouteNames.PURCHASES} component={PurchaseView} />
        <Stack.Screen name={RouteNames.TRACKVIEW} component={InventoryTrackView} />
      </Stack.Navigator>
      <AddEditItemModal />
      <SettingsAddEditModal />
    </>

  );
};
