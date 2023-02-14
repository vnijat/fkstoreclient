import React, { FC, useState } from "react";
import { Text, View } from "react-native";
import CustomPressable from "../../../../components/customPressable";
import { Colors } from "../../../../utils/colors";
import FONT from "../../../../utils/font";
import { IRouteData } from "../drawerRoutes";
import { getStyle } from "./styles";

interface CustomDrawerItemProps {
    onPressRoute: (route: string) => void;
    currentRoute: string;
    routeObject: IRouteData;
    isChild?: boolean;
}

const CustomDrawerItem: FC<CustomDrawerItemProps> = ({ currentRoute, onPressRoute, routeObject, isChild }) => {
    const { title, routeName, icon, childRoutes } = routeObject;
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
        <>
            <CustomPressable onHoverOpacity style={[{ backgroundColor: isSelected ? Colors.METALLIC_GOLD : 'transparent' }, isChild ? style.childDrawer : style.drawerItem]}
                onLongPress={onLongPress}
                onPress={onPressHandler}>
                {icon(isSelected ? Colors.CARD_COLOR : Colors.DEFAULT_TEXT_COLOR)}
                <Text style={{ color: isSelected ? Colors.CARD_COLOR : Colors.DEFAULT_TEXT_COLOR, fontSize: FONT.FONT_SIZE_SMALL, fontWeight: FONT.FONT_BOLD, fontFamily: FONT.FONT_FAMILY }} >
                    {title.toUpperCase()}
                </Text>
            </CustomPressable>
            {
                childRoutes?.length && showChild &&
                childRoutes.map((route, index) => {
                    return <CustomDrawerItem routeObject={route} {...{ currentRoute, onPressRoute }} key={`${index} - ${route.routeName}`} isChild />;
                })
            }
        </>
    );
};

export default CustomDrawerItem;