
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ItemsIcon } from '../../assets/icons/menuIcons';
import ConfigsView from '../../mobile/views/configsView';
import MainMobile from '../../mobile/views/mainView';
import ProductView from '../../mobile/views/productsView';
import ScanView from '../../mobile/views/scanView';
import { Colors } from '../../utils/colors';
import HeaderLeft from './components/headerLeft';
import HeaderRight from './components/headerRight';
import BottomTabScreenOptions from './configs/bottomTabScreenOptions';




export const BottomTabNavigator = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={BottomTabScreenOptions}>
            <Tab.Screen name={'Dashboard'} component={MainMobile} options={{
                tabBarIcon: ({ color }) => {
                    return <Icon name={'grid'} size={25} color={color} />;
                }
            }} />
            <Tab.Screen name={'Scan'} component={ScanView}
                options={{
                    tabBarIcon: ({ color }) => {
                        return <MIcon name={'barcode-scan'} size={25} color={color} />;
                    }
                }}
            />
            <Tab.Screen name={'Products'} component={ProductView}
                options={{
                    tabBarIcon: ({ color }) => {
                        return <ItemsIcon size={25} color={color} />;
                    }
                }}
            />
        </Tab.Navigator >
    );
};