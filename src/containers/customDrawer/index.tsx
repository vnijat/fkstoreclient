import React, {FC, useMemo, } from "react";
import {Image, Text, useWindowDimensions, View} from "react-native";
import {getStyle} from "./styles";
import {DrawerNavigationHelpers} from "@react-navigation/drawer/lib/typescript/src/types";
import CustomPressable from "../../components/customPressable";
import {useAppDispatch} from "../../modules/redux/store";
import Icon from "react-native-vector-icons/Entypo";
import {Colors} from "../../utils/colors";
import {setIsShowSettingsModal} from "../../modules/redux/appStateSlicer";
import NavigationRoutes from "./components/drawerRoutes";

interface ISideBar {
    navigation: DrawerNavigationHelpers;
    currentRoute: string;
    routeNames: Array<string>;
}

const SideBar: FC<ISideBar> = ({navigation, currentRoute, routeNames}) => {
    const {width} = useWindowDimensions();
    const dispatch = useAppDispatch();
    const style = useMemo(() => getStyle(width), [width]);

    const onPressConfigs = () => {
        dispatch(setIsShowSettingsModal(true));
    };

    return (
        <View style={style.container}>
            {/* <View style={style.border} /> */}
            <View>
                <NavigationRoutes navigation={navigation} currentRoute={currentRoute} />
            </View>
            <View style={style.bottomContainer}>
                <CustomPressable
                    onPress={onPressConfigs}
                    onHoverOpacity
                    style={style.configButton} >
                    <Icon name='cog' size={30} color={Colors.DEFAULT_TEXT_COLOR} />
                </CustomPressable>
                <Image source={require('../../assets/logo/LOGO.svg')} resizeMode={'contain'} style={{height: 60}} />
            </View>
        </View >
    );

};
export default SideBar;