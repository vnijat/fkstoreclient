import React from "react";
import { ClientsIcon, OrdersIcon, ProjectsIcon, PurchasesIcon, TrackIcon, WarehouseIcon } from "../../../../assets/icons/menuIcons";
import { RouteNames } from "../../../../enums/routes";
import UseLanguage from "../../../../modules/lozalization/useLanguage.hook";
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
    const lang = UseLanguage();

    const drawerRoutesData: IRouteData[] = [
        {
            title: lang['wareHouse'],
            routeName: RouteNames.WAREHOUSE,
            icon: (color: string) => <WarehouseIcon size={ICON_SIZE} color={color} />,
            childRoutes: [
                {
                    title: lang['orders'],
                    routeName: RouteNames.ORDERS,
                    icon: (color: string) => <OrdersIcon size={ICON_SIZE} color={color} />,
                },
                {
                    title: lang['purchases'],
                    routeName: RouteNames.PURCHASES,
                    icon: (color: string) => <PurchasesIcon size={ICON_SIZE} color={color} />,
                },
            ],
        },
        {
            title: lang['clients'],
            routeName: RouteNames.CLIENTS,
            icon: (color: string) => <ClientsIcon size={ICON_SIZE} color={color} />,
        },
        {
            title: lang['projects'],
            routeName: RouteNames.PROJECTS,
            icon: (color: string) => <ProjectsIcon size={ICON_SIZE} color={color} />,
        },
        {
            title: lang['trackView'],
            routeName: RouteNames.TRACKVIEW,
            icon: (color: string) => <TrackIcon size={ICON_SIZE} color={color} />,
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