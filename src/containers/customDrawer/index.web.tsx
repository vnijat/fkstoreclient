import React, {FC, useMemo, } from "react";
import {Image, useWindowDimensions, View} from "react-native";
import {getStyle} from "./styles";
import NavigationRoutes from "./components/drawerRoutes";
import {NavigationContainerRef} from "@react-navigation/native";

interface ISideBar {
    navigation: NavigationContainerRef<ReactNavigation.RootParamList>;
    currentRoute: string;
    routeNames: Array<string>;
}

const SideBar: FC<ISideBar> = ({navigation, currentRoute, routeNames}) => {
    const {width} = useWindowDimensions();
    const style = useMemo(() => getStyle(width), [width]);


    return (
        <View style={style.container}>
            <View>
                <NavigationRoutes navigation={navigation} currentRoute={currentRoute} routeNames={routeNames} />
            </View>
            <View style={style.bottomContainer}>
                <Image source={require('../../assets/logo/LOGO.svg')} resizeMode={'center'} style={{height: 60, width: 60}} />
            </View>
        </View >
    );

};
export default SideBar;