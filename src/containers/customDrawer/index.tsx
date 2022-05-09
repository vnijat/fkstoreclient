import React, { FC, useMemo, } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { getStyle } from "./styles";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { CustomDrawerItem } from "./components/drawerItem/drawerItem";

interface ICustomDrawer {
    navigation: DrawerNavigationHelpers;
    currentRoute: string;
    routeNames: Array<string>;
}

const CustomDrawer: FC<ICustomDrawer> = ({ navigation, currentRoute, routeNames }) => {
    const { width } = useWindowDimensions();
    const style = useMemo(() => getStyle(width), [width]);

    return (
        <View style={style.container}   >
            <CustomDrawerItem navigation={navigation} routeNames={routeNames} currentRoute={currentRoute} />
            <View style={style.bottomContainer}>
                <Text style={style.logoText}>
                    {'FK'}
                </Text >
            </View>
        </View >
    );

};
export default CustomDrawer;