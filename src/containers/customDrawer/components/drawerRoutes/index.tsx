import React from "react";
import {ClientsIcon, OrdersIcon, ProjectsIcon, PurchasesIcon, TrackIcon, TransfersIcon, WarehouseIcon} from "../../../../assets/icons/menuIcons";
import {RouteNames} from "../../../../enums/routes";
import UseLanguage from "../../../../modules/lozalization/useLanguage.hook";
import CustomDrawerItem from "../drawerItem/drawerItem";


interface INavigationRoutes {
    currentRoute: string;
    navigation: any;
    routeNames: string[];
}


export interface IRouteData {
    title: string;
    routeName: string;
    icon: (color: string) => React.ReactNode;
    childRoutes?: IRouteData[];
}

const NavigationRoutes = ({navigation, currentRoute, routeNames}: INavigationRoutes) => {
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
                    title: lang['transfers'],
                    routeName: RouteNames.TRANSFERS,
                    icon: (color: string) => <TransfersIcon size={ICON_SIZE} color={color} />,
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
                if (!routeNames.includes(route.routeName)) {
                    return null;
                }
                return (
                    <CustomDrawerItem key={`${index}-${route.routeName}`} routeObject={route} onPressRoute={onPressRoute} currentRoute={currentRoute} />
                );
            })}
        </>
    );
};

export default NavigationRoutes;