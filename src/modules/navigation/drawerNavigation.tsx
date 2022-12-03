import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { FC } from 'react';
import { OrderView } from '../../views/orderView';
import { PurchaseView } from '../../views/purchaseView';
import CustomDrawer from '../../containers/customDrawer';
import { ClientsView } from '../../views/clientsView';
import { ItemsView } from '../../views/itemsView';
import ProjectsView from '../../views/projectsView';
import SettingsAddEditModal from '../../containers/settingsAddEditModal';

export const DrawerNavigation: FC<any> = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator initialRouteName='Items'
            drawerContent={({ navigation, state }) =>
                <CustomDrawer
                    navigation={navigation}
                    routeNames={state.routeNames} currentRoute={state.routes[state.index].name} />}
            screenOptions={{ headerShown: false, drawerStyle: { backgroundColor: 'transparent', width: 0 } }}>
            <Drawer.Screen name="Items" component={ItemsView} />
            <Drawer.Screen name="Clients" component={ClientsView} />
            <Drawer.Screen name="Projects" component={ProjectsView} />
            <Drawer.Screen name="Orders" component={OrderView} />
            <Drawer.Screen name="Purchases" component={PurchaseView} />
        </Drawer.Navigator>
    );
};
