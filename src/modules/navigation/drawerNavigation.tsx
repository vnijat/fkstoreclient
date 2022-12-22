import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { FC } from 'react';
import { Pressable, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import ConfigsView from '../../mobile/views/configsView';
import { Colors } from '../../utils/colors';
import { BottomTabNavigator } from './bottomTabNavigator';

export const DrawerNavigation: FC<any> = () => {
    const Drawer = createDrawerNavigator();

    return (
        <>
            <StatusBar backgroundColor={Colors.METALLIC_GOLD} />
            <Drawer.Navigator initialRouteName='Home'
                screenOptions={({ navigation }) => ({
                    headerShown: false,
                    drawerPosition: 'right',
                    drawerStyle: { backgroundColor: Colors.CARD_COLOR },
                    drawerActiveBackgroundColor: Colors.METALLIC_GOLD,
                    drawerInactiveBackgroundColor: Colors.CARD_HEADER_COLOR,
                    drawerLabelStyle: { color: Colors.DEFAULT_TEXT_COLOR, fontSize: 14 },
                    drawerItemStyle: { borderRadius: 3 },
                    headerStyle: { backgroundColor: Colors.CARD_COLOR, shadowColor: Colors.METALLIC_GOLD, shadowOffset: { height: 7, width: 0 }, shadowRadius: 9, shadowOpacity: 0.5, elevation: 16 },
                    headerTitleStyle: { color: Colors.DEFAULT_TEXT_COLOR },
                    headerTitleAlign: 'center',
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
                })}
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
