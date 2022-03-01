import { createDrawerNavigator, getDrawerStatusFromState, useDrawerStatus } from '@react-navigation/drawer';
import React, { FC } from 'react';
import { FontIcon, NavigationView, NavigationViewItem } from 'react-native-xaml';
import { HomeView } from '../../views/homeView';
import { OrderView } from '../../views/orderView';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PurchaseView } from '../../views/purchaseView';
import { CustomDrawerContent } from '../../components/customDrawer';

export const DrawerNavigation: FC<any> = ({ navigation }) => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator initialRouteName='Home'
            drawerContent={({ navigation, descriptors, state }) =>
                <CustomDrawerContent
                    navigation={navigation}
                    routeNames={state.routeNames} currentRoute={state.routes[state.index].name} />}
            screenOptions={{ headerShown: false, drawerStyle: { backgroundColor: 'transparent', width: 0 } }}>
            <Drawer.Screen name="Home" component={HomeView} />
            <Drawer.Screen name="Orders" component={OrderView} />
            <Drawer.Screen name="Purchases" component={PurchaseView} />
        </Drawer.Navigator>
    );
};
