import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { FC } from 'react';
import { OrderView } from '../../views/orderView';
import CustomDrawer from '../../containers/customDrawer';
import { ClientsView } from '../../views/clientsView';
import ProjectsView from '../../views/projectsView';
import PurchaseView from '../../views/purchaseView';
import { RouteNames } from '../../enums/routes';
import WareHouseView from '../../views/warehouseView';
import { DrawerStackParamlist } from '../../types/navigation';
import InventoryTrackView from '../../views/inventoryTrackView';

export const DrawerNavigation: FC<any> = () => {
    const Drawer = createDrawerNavigator<DrawerStackParamlist>();

    return (
        <Drawer.Navigator initialRouteName={RouteNames.WAREHOUSE}
            drawerContent={({ navigation, state }) =>
                <CustomDrawer
                    navigation={navigation}
                    routeNames={state.routeNames} currentRoute={state.routes[state.index].name} />}
            screenOptions={{ headerShown: false, drawerStyle: { backgroundColor: 'transparent', width: 0 } }}>
            <Drawer.Screen name={RouteNames.WAREHOUSE} component={WareHouseView} />
            <Drawer.Screen name={RouteNames.CLIENTS} component={ClientsView} />
            <Drawer.Screen name={RouteNames.PROJECTS} component={ProjectsView} />
            <Drawer.Screen name={RouteNames.ORDERS} component={OrderView} />
            <Drawer.Screen name={RouteNames.PURCHASES} component={PurchaseView} />
            <Drawer.Screen name={RouteNames.TRACKVIEW} component={InventoryTrackView} />
        </Drawer.Navigator>
    );
};
