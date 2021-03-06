import { DrawerItem } from "@react-navigation/drawer";
import React, { FC } from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../../../../utils/colors";
import { getStyle } from "./styles";

interface CustomDrawerItemProps {
    routeNames: string[];
    currentRoute: string;
    navigation: any;
}

export const CustomDrawerItem: FC<CustomDrawerItemProps> = ({ navigation, routeNames, currentRoute }) => {
    const style = getStyle();

    const drawerItem = routeNames.map((route) => {
        const isSelected = currentRoute === route;
        const itemContentColor = isSelected ? Colors.FLORAL_WHITE : Colors.DARK_GOLDENROD;
        const icons: any = {
            Home: <Icon name="home" size={22} color={itemContentColor} />,
            Orders: <Icon name="shopping-basket" size={22} color={itemContentColor} />,
            Purchases: <Icon name="cart-plus" size={22} color={itemContentColor} />,
            Default: <Icon name="flask" size={22} color={itemContentColor} />
        };
        return (
            < DrawerItem
                label={''}
                onPress={() => navigation.navigate(route)}
                key={route}
                icon={() => {
                    return (
                        <View style={style.drawerItemLogo}>
                            {icons[route] ? icons[route] : icons['Default']}
                            <Text style={{ color: isSelected ? Colors.FLORAL_WHITE : Colors.OLD_GOLD, fontSize: 10, fontWeight: '700' }} >
                                {route}
                            </Text>
                        </View>
                    );
                }}
                style={{ marginHorizontal: 1, backgroundColor: isSelected ? Colors.OLD_GOLD : null }}
            />
        );
    });

    return (
        <>
            {drawerItem}
        </>
    );
};