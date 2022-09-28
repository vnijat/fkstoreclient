import React, { FC } from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { AddItemIcon, ClientsIcon, DefaultMenuIcon, ItemsIcon, OrdersIcon, PurchasesIcon } from "../../../../assets/icons/menuIcons";
import CustomPressable from "../../../../components/customPressable";
import { Colors } from "../../../../utils/colors";
import { getStyle } from "./styles";

interface CustomDrawerItemProps {
    routeNames: string[];
    currentRoute: string;
    navigation: any;
}

export const CustomDrawerItem: FC<CustomDrawerItemProps> = ({ navigation, routeNames, currentRoute }) => {
    const style = getStyle();
    const ICON_SIZE = 30;
    const drawerItem = routeNames.map((route) => {
        const isSelected = currentRoute === route;
        const itemContentColor = isSelected ? Colors.CARD_COLOR : Colors.DEFAULT_TEXT_COLOR;
        const icons: any = {
            Items: <ItemsIcon size={ICON_SIZE} color={itemContentColor} />,
            Clients: <ClientsIcon size={ICON_SIZE} color={itemContentColor} />,
            Orders: <OrdersIcon size={ICON_SIZE} color={itemContentColor} />,
            Purchases: <PurchasesIcon size={ICON_SIZE} color={itemContentColor} />,
            AddItem: <AddItemIcon size={ICON_SIZE} color={itemContentColor} />,
            Default: <DefaultMenuIcon size={ICON_SIZE} color={itemContentColor} />,
        };
        return (
            <CustomPressable onHoverOpacity key={route} style={[{ backgroundColor: isSelected ? Colors.METALLIC_GOLD : 'transparent' }, style.drawerItemLogo]} onPress={() => navigation.navigate(route)}>
                {icons[route] ? icons[route] : icons['Default']}
                <Text style={{ color: isSelected ? Colors.CARD_COLOR : Colors.DEFAULT_TEXT_COLOR, fontSize: 10, fontWeight: '700' }} >
                    {route.toLocaleUpperCase()}
                </Text>
            </CustomPressable>
        );
    });

    return (
        <>
            {drawerItem}
        </>
    );
};