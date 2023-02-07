import React from "react";
import { ClientsIcon, OrdersIcon, ProjectsIcon, PurchasesIcon, WarehouseIcon } from "../../../../assets/icons/menuIcons";
import CustomDrawerItem from "../drawerItem/drawerItem";


interface IDrawerRoutes {
    currentRoute: string;
    navigation: any;
}


export interface IRouteData {
    title: string;
    routeName: string;
    icon: (color: string) => Element;
    childRoutes?: IRouteData[];
}

const DrawerRoutes = ({ navigation, currentRoute }: IDrawerRoutes) => {
    const ICON_SIZE = 30;

    const drawerRoutesData: IRouteData[] = [
        {
            title: 'Warehouse',
            routeName: 'Items',
            icon: (color: string) => <WarehouseIcon size={ICON_SIZE} color={color} />,
            childRoutes: [
                {
                    title: 'Orders',
                    routeName: 'Orders',
                    icon: (color: string) => <OrdersIcon size={ICON_SIZE} color={color} />,
                },
                {
                    title: 'Purchases',
                    routeName: 'Purchases',
                    icon: (color: string) => <PurchasesIcon size={ICON_SIZE} color={color} />,
                },
            ],
        },
        {
            title: 'Clients',
            routeName: 'Clients',
            icon: (color: string) => <ClientsIcon size={ICON_SIZE} color={color} />,
        },
        {
            title: 'Projects',
            routeName: 'Projects',
            icon: (color: string) => <ProjectsIcon size={ICON_SIZE} color={color} />,
        },
    ];

    const onPressRoute = (route: string) => {
        navigation.navigate(route);
    };


    return (
        <>
            {drawerRoutesData.map((route, index) => {
                return (
                    <CustomDrawerItem key={`${index}-${route.routeName}`} routeObject={route} onPressRoute={onPressRoute} currentRoute={currentRoute} />
                );
            })}
        </>
    );
};

export default DrawerRoutes;