import {RouteNames} from '../enums/routes';

type RootStackParamList = {
  [RouteNames.DRAWER]: undefined;
};

type RootStackMobileParamList = {
  [RouteNames.DRAWER]: undefined;
  [RouteNames.PRODUCT_INFO]: {barcode: string};
};

type DrawerStackParamlist = {
  [RouteNames.CLIENTS]: undefined;
  [RouteNames.ORDERS]: undefined;
  [RouteNames.PROJECTS]: undefined;
  [RouteNames.PURCHASES]: undefined;
  [RouteNames.WAREHOUSE]: undefined;
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
};
