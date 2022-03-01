import { DrawerItem } from "@react-navigation/drawer";
import React, { FC } from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { getStyle } from "./styles";

interface CustomDrawerItemProps {
    isMenuExpanded: boolean;
    routeNames: string[];
    currentRoute: string;
    navigation: any;
}

export const CustomDrawerItem: FC<CustomDrawerItemProps> = ({ navigation, isMenuExpanded, routeNames, currentRoute }) => {
    const style = getStyle();

    const drawerItem = routeNames.map((route) => {
        const isSelected = currentRoute === route;
        const itemContentColor = isSelected ? '#E8F6F3' : '#455A64';
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
                            <Text style={{ color: 'black', fontSize: 12 }}>
                                {route}
                            </Text>
                        </View>
                    );
                }}
                style={{ marginHorizontal: 1, backgroundColor: isSelected ? '#4DB6AC' : null }}
            />
        );
    });

    return (
        <>
            {drawerItem}
        </>
    );
};;;;;;