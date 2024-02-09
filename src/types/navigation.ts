import {RouteNames} from '../enums/routes';

type RootStackParamList = {
  [RouteNames.LOGIN]: undefined;
  [RouteNames.CLIENTS]: undefined;
  [RouteNames.ORDERS]: undefined;
  [RouteNames.PROJECTS]: undefined;
  [RouteNames.PURCHASES]: undefined;
  [RouteNames.WAREHOUSE]: undefined;
  [RouteNames.TRACKVIEW]: undefined;
};


type AuthStackParamList = {
};


type RootStackMobileParamList = {
  [RouteNames.DRAWER]: undefined;
  [RouteNames.PRODUCT_INFO]: {barcode: string;};
};

type BottomTabMobileStack = {
  [RouteNames.HOME]: undefined;
  [RouteNames.DASHBOARD]: undefined;
  [RouteNames.ORDERS]: undefined;
  [RouteNames.SCAN]: {
    isFromOrder?: boolean;
    isFromPurchase?: boolean;
    addScannedProductToOrder?: (barcode: string) => Promise<void>;
  };
  [RouteNames.PRODUCTS]: undefined;
  [RouteNames.PURCHASES]: undefined;
};

type DrawerStackParamlist = {
  [RouteNames.CLIENTS]: undefined;
  [RouteNames.ORDERS]: undefined;
  [RouteNames.PROJECTS]: undefined;
  [RouteNames.PURCHASES]: undefined;
  [RouteNames.WAREHOUSE]: undefined;
  [RouteNames.TRACKVIEW]: undefined;
};

type DrawerStackMobileParamlist = {
  [RouteNames.HOME]: undefined;
  [RouteNames.CONFIG]: undefined;
};

export type {
  RootStackParamList,
  DrawerStackParamlist,
  RootStackMobileParamList,
  DrawerStackMobileParamlist,
  BottomTabMobileStack,
  AuthStackParamList
};
