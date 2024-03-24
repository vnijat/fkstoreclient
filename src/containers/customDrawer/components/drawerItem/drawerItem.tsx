import React, {FC, useState} from "react";
import {Text, View} from "react-native";
import CustomPressable from "../../../../components/customPressable";
import {Colors} from "../../../../utils/colors";
import FONT from "../../../../utils/font";
import {IRouteData} from "../drawerRoutes";
import {getStyle} from "./styles";

interface CustomDrawerItemProps {
    onPressRoute: (route: string) => void;
    currentRoute: string;
    routeObject: IRouteData;
    isChild?: boolean;
}

const CustomDrawerItem: FC<CustomDrawerItemProps> = ({currentRoute, onPressRoute, routeObject, isChild}) => {
    const {title, routeName, icon, childRoutes} = routeObject;
    const [isShowChild, setIsShowChild] = useState(false);
    const style = getStyle();
    const isSelected = routeName === currentRoute;
    const isSomeChildSelected = childRoutes?.length && childRoutes.some((child) => child.routeName === currentRoute);
    const showChild = (isSelected || isSomeChildSelected) || isShowChild;
    const onLongPress = () => {
        setIsShowChild(state => !state);
    };

    const onPressHandler = () => {
        onPressRoute(routeName);
    };
    return (
        <View tooltip={title} >
            <CustomPressable onHoverOpacity style={[{backgroundColor: isSelected ? Colors.METALLIC_GOLD : 'transparent'}, isChild ? style.childDrawer : style.drawerItem]}
                onLongPress={onLongPress}
                onPress={onPressHandler}>
                {icon(isSelected ? Colors.CARD_COLOR : Colors.DEFAULT_TEXT_COLOR)}
                <Text numberOfLines={1}  style={[style.routeTitle, {color: isSelected ? Colors.CARD_COLOR : Colors.DEFAULT_TEXT_COLOR}]}  >
                    {title.toUpperCase()}
                </Text>
            </CustomPressable>
            {
                childRoutes?.length && showChild &&
                childRoutes.map((route, index) => {
                    return <CustomDrawerItem routeObject={route} {...{currentRoute, onPressRoute}} key={`${index} - ${route.routeName}`} isChild />;
                })
            }
        </View>
    );
};

export default CustomDrawerItem;