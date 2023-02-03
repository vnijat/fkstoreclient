import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { FC } from 'react';
import { Pressable, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import ConfigsView from '../../mobile/views/configsView';
import ProductInfoView from '../../mobile/views/productInfoView';
import { Colors } from '../../utils/colors';
import { BottomTabNavigator } from './bottomTabNavigator';
import DrawerScreenOptions from './configs/drawerScreenOptions';

export const DrawerNavigation = ({ }) => {
    const Drawer = createDrawerNavigator();
    return (
        <>
            <StatusBar backgroundColor={Colors.METALLIC_GOLD} />
            <Drawer.Navigator initialRouteName='Home'
                screenOptions={DrawerScreenOptions}
            >
                <Drawer.Screen name="Home" component={BottomTabNavigator} />
                <Drawer.Screen name="Config" component={ConfigsView}
                    options={{
                        headerShown: true
                    }}
                />
            </Drawer.Navigator>
        </>
    );
};
