import React, {FC} from 'react';
import {Pressable, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {RouteNames} from '../../enums/routes';
import ConfigsView from '../../mobile/views/configsView';
import ProductInfoView from '../../mobile/views/productInfoView';
import {DrawerStackMobileParamlist} from '../../types/navigation';
import {Colors} from '../../utils/colors';
import {BottomTabNavigator} from './bottomTabNavigator';
import DrawerScreenOptions from './configs/drawerScreenOptions';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './components/drawerConent';
import ProfileView from '../../mobile/views/profileView';

const Drawer = createDrawerNavigator<DrawerStackMobileParamlist>();

export const DrawerNavigation = ({}) => {
    return (
        <Drawer.Navigator initialRouteName={RouteNames.HOME}
            drawerContent={({navigation, state}) => <DrawerContent {...{navigation, state}} />}
            screenOptions={DrawerScreenOptions}
        >
            <Drawer.Screen name={RouteNames.HOME} component={BottomTabNavigator} options={{headerShown: false}} />
            <Drawer.Screen name={RouteNames.PROFILE} component={ProfileView} />
            <Drawer.Screen name={RouteNames.CONFIG} component={ConfigsView} />
        </Drawer.Navigator >
    );
};
