import {createNavigationContainerRef, NavigationProp, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {FC, useEffect, useMemo, useState} from 'react';
import SideBar from '../../containers/customDrawer';
import CustomDrawer from '../../containers/customDrawer';
import SettingsAddEditModal from '../../containers/settingsAddEditModal/index.windows';
import {RouteNames} from '../../enums/routes';
import {RootStackParamList} from '../../types/navigation';
import {ClientsView} from '../../views/clientsView';
import InventoryTrackView from '../../views/inventoryTrackView';
import {OrderView} from '../../views/orderView';
import ProjectsView from '../../views/projectsView';
import PurchaseView from '../../views/purchaseView';
import WareHouseView from '../../views/warehouseView';
import AddEditItemModal from '../../views/warehouseView/components/addEditItemModal';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import LoginView from '../../views/loginView';
import HeaderComponent from './components/headerComponent';
import HELP from '../../services/helpers';
import {Role} from '../../enums/userRole';


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
    <>
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
          </>
        }
      </Stack.Navigator >
      <AddEditItemModal />
      <SettingsAddEditModal />
    </>

  );
};
