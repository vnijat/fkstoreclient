import {createNavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {FC, useEffect, useMemo, useState} from 'react';
import SideBar from '../../containers/customDrawer';
import {RouteNames} from '../../enums/routes';
import {RootStackParamList} from '../../types/navigation';
import {useSelector} from 'react-redux';
import LoginView from '../../views/loginView';
import HeaderComponent from './components/headerComponent';
import WareHouseView from '../../views/warehouseView';
import {View} from 'react-native';
import {Role} from '../../enums/userRole';
import ProjectsView from '../../views/projectsView';
import {OrderView} from '../../views/orderView';
import PurchaseView from '../../views/purchaseView';
import InventoryTrackView from '../../views/inventoryTrackView';
import InventoryTransfersView from '../../views/inventoryTransfersView';
import HELP from '../../services/helpers';
import {RootState} from '../redux/store';



export const navigationRef = createNavigationContainerRef();
const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigation: FC<any> = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [event, setEvent] = useState();

  navigationRef.addListener('state', (ev) => setEvent(ev));
  const renderSideBar = useMemo(() => {
    if (user && navigationRef?.isReady() && navigationRef.getRootState()) {
      const navigation = navigationRef.current;
      const routeNames = navigationRef.current?.getRootState().routeNames;
      const currentRoute = navigationRef.current?.getCurrentRoute()?.name;
      return <SideBar navigation={navigation!} routeNames={routeNames!} currentRoute={currentRoute!} />;
    } else {
      return null;
    }
  }, [event, user]);



  return (
    <View style={{flexDirection: 'column', flex: 1}}>
      <HeaderComponent />
      {renderSideBar}
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}
      >
        {!user ?
          <>
            <Stack.Screen name={RouteNames.LOGIN} component={LoginView} />
          </>
          :
          <>
            <Stack.Screen name={RouteNames.WAREHOUSE} component={WareHouseView} />
            {HELP.hasPermission([Role.MANAGER, Role.SUPER_ADMIN]) && <Stack.Screen name={RouteNames.CLIENTS} component={ClientsView} />}
            <Stack.Screen name={RouteNames.PROJECTS} component={ProjectsView} />
            <Stack.Screen name={RouteNames.ORDERS} component={OrderView} />
            <Stack.Screen name={RouteNames.PURCHASES} component={PurchaseView} />
            <Stack.Screen name={RouteNames.TRACKVIEW} component={InventoryTrackView} />
            <Stack.Screen name={RouteNames.TRANSFERS} component={InventoryTransfersView} />
          </>
        }
      </Stack.Navigator >
      {/* <AddEditItemModal /> */}
      {/* <SettingsAddEditModal /> */}
    </View>

  );
};
