
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




export const BottomTabNavigator = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={({ navigation, route }) => ({
            tabBarActiveTintColor: Colors.METALLIC_GOLD,
            tabBarInactiveTintColor: Colors.DEFAULT_TEXT_COLOR,
            tabBarStyle: {
                backgroundColor: Colors.CARD_COLOR,
            },
            headerLeft: () => {
                return <Pressable style={{ marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => navigation.goBack()}
                    hitSlop={{ left: 20, top: 20, bottom: 20 }}
                >
                    <Icon name='chevron-thin-left' size={25} color={Colors.DEFAULT_TEXT_COLOR} />
                </Pressable>;
            },
            headerRight: () => {
                return <Pressable style={{ alignItems: 'center', justifyContent: 'center', marginRight: 15 }}
                    onPress={() => navigation.openDrawer()}
                    hitSlop={{ left: 20, top: 20, bottom: 20 }}
                >
                    <Icon name='menu' size={30} color={Colors.DEFAULT_TEXT_COLOR} />
                </Pressable>;
            },
            headerStyle: { backgroundColor: Colors.CARD_COLOR, shadowColor: Colors.METALLIC_GOLD, shadowOffset: { height: 7, width: 0 }, shadowRadius: 9, shadowOpacity: 0.5, elevation: 16 },
            headerTitleStyle: { color: Colors.DEFAULT_TEXT_COLOR },
            headerTitleAlign: 'center',
        })}>
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