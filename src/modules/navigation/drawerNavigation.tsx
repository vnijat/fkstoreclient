import { createDrawerNavigator, getDrawerStatusFromState, useDrawerStatus } from '@react-navigation/drawer';
import React, { FC } from 'react';
import { HomeView } from '../../views/homeView';
import { OrderView } from '../../views/orderView';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PurchaseView } from '../../views/purchaseView';
import CustomDrawer from '../../containers/customDrawer';
import { AddItemView } from '../../views/addItemView';

export const DrawerNavigation: FC<any> = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator initialRouteName='Home'
            drawerContent={({ navigation, state }) =>
                <CustomDrawer
                    navigation={navigation}
                    routeNames={state.routeNames} currentRoute={state.routes[state.index].name} />}
            screenOptions={{ headerShown: false, drawerStyle: { backgroundColor: 'transparent', width: 0 } }}>
            <Drawer.Screen name="Home" component={HomeView} />
            <Drawer.Screen name="Orders" component={OrderView} />
            <Drawer.Screen name="Purchases" component={PurchaseView} />
            <Drawer.Screen name="AddItem" component={AddItemView} />
        </Drawer.Navigator>
    );
};
