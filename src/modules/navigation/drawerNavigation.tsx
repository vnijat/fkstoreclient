import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { FC } from 'react';
import { Pressable, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { RouteNames } from '../../enums/routes';
import ConfigsView from '../../mobile/views/configsView';
import ProductInfoView from '../../mobile/views/productInfoView';
import { DrawerStackMobileParamlist } from '../../types/navigation';
import { Colors } from '../../utils/colors';
import { BottomTabNavigator } from './bottomTabNavigator';
import DrawerScreenOptions from './configs/drawerScreenOptions';

export const DrawerNavigation = ({ }) => {
    const Drawer = createDrawerNavigator<DrawerStackMobileParamlist>();
    return (
        <>
            <StatusBar backgroundColor={Colors.CARD_COLOR} />
            <Drawer.Navigator initialRouteName={RouteNames.HOME}
                screenOptions={DrawerScreenOptions}
            >
                <Drawer.Screen name={RouteNames.HOME} component={BottomTabNavigator} />
                <Drawer.Screen name={RouteNames.CONFIG} component={ConfigsView}
                    options={{
                        headerShown: true
                    }}
                />
            </Drawer.Navigator>
        </>
    );
};
