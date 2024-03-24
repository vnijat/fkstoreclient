import {BottomTabNavigationOptions} from "@react-navigation/bottom-tabs";
import {DrawerNavigationOptions, DrawerNavigationProp} from "@react-navigation/drawer";
import {ParamListBase, RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import React from "react";
import {Colors} from "../../../utils/colors";
import HeaderLeft from "../components/headerLeft";
import HeaderRight from "../components/headerRight";

interface IDefaultScreenOptions {
    route: RouteProp<ParamListBase>;
    navigation: any;
}

const DrawerScreenOptions = ({navigation, route}: IDefaultScreenOptions): DrawerNavigationOptions => ({
    headerShown: true,
    drawerPosition: 'right',
    drawerStyle: {backgroundColor: Colors.CARD_COLOR},
    drawerActiveBackgroundColor: Colors.METALLIC_GOLD,
    drawerInactiveBackgroundColor: Colors.CARD_HEADER_COLOR,
    drawerLabelStyle: {color: Colors.DEFAULT_TEXT_COLOR, fontSize: 14},
    drawerItemStyle: {borderRadius: 3},
    headerStyle: {backgroundColor: Colors.CARD_COLOR, shadowColor: Colors.METALLIC_GOLD, shadowOffset: {height: 7, width: 0}, shadowRadius: 9, shadowOpacity: 0.5, elevation: 16},
    // headerTitleStyle: { color: Colors.DEFAULT_TEXT_COLOR },
    // headerTitleAlign: 'center',
    headerTitle: () => null,
    headerLeft: () => <HeaderLeft navigation={navigation} />,
    headerRight: () => <HeaderRight navigation={navigation} />
});

export default DrawerScreenOptions;