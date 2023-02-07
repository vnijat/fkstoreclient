
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useMemo } from 'react';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { ItemsIcon } from '../../assets/icons/menuIcons';
import ConfigsView from '../../mobile/views/configsView';
import MainMobile from '../../mobile/views/mainView';
import OrdersViewMobile from '../../mobile/views/ordersView';
import ProductView from '../../mobile/views/productsView';
import ScanView from '../../mobile/views/scanView';
import { Colors } from '../../utils/colors';
import UseLanguage from '../lozalization/useLanguage.hook';
import { RootState } from '../redux/store';
import HeaderLeft from './components/headerLeft';
import HeaderRight from './components/headerRight';
import BottomTabScreenOptions from './configs/bottomTabScreenOptions';




export const BottomTabNavigator = () => {
    const Tab = createBottomTabNavigator();
    const T = UseLanguage();
    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={BottomTabScreenOptions}>
            <Tab.Screen name={'Dashboard'} component={MainMobile} options={{
                tabBarIcon: ({ color }) => {
                    return <Icon name={'grid'} size={25} color={color} />;
                },
                tabBarLabel: T['dashBoard']
            }} />
            <Tab.Screen name={'Orders'} component={OrdersViewMobile} options={{
                tabBarIcon: ({ color }) => {
                    return <Icon name={'open-book'} size={25} color={color} />;
                },
                tabBarLabel: T['orders']

            }} />
            <Tab.Screen name={'Scan'} component={ScanView}
                options={{
                    tabBarIcon: ({ color }) => {
                        return <MIcon name={'barcode-scan'} size={25} color={color} />;
                    },
                    tabBarLabel: T['scan']
                }}   
            />
            <Tab.Screen name={'Products'} component={ProductView}
                options={{
                    tabBarIcon: ({ color }) => {
                        return <ItemsIcon size={25} color={color} />;
                    },
                    tabBarLabel: T['products']

                }}
            />
        </Tab.Navigator >
    );
};