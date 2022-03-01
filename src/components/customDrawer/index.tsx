import { DrawerContentScrollView, DrawerItem, DrawerNavigationProp, useDrawerStatus } from "@react-navigation/drawer";
import React, { FC, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, Pressable, Text, useWindowDimensions, View } from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { expandMenu } from "../../modules/redux/menuSlicer";
import { RootState, useAppDispatch } from "../../modules/redux/store";
import { getStyle } from "./styles";
import { CustomDrawerItem } from "./components/drawerItem/drawerItem";

interface ICustomDrawer {
    navigation: DrawerNavigationProp<{}>;
    currentRoute: string;
    routeNames: Array<string>;
}

export const CustomDrawerContent: FC<ICustomDrawer> = ({ navigation, currentRoute, routeNames }) => {
    const { width } = useWindowDimensions();
    const style = useMemo(() => getStyle(width), [width]);
    const isMenuExpanded = useSelector((state: RootState) => state.menuSlicer.expanded);
    const dispatch = useAppDispatch();
    
    return (
        <View style={style.container}   >
            <CustomDrawerItem navigation={navigation} routeNames={routeNames} currentRoute={currentRoute} isMenuExpanded={isMenuExpanded} />
            <View style={style.bottomContainer}>
                <Text style={style.logoText}>
                    {'FK'}
                </Text >
            </View>
        </View >
    );

};