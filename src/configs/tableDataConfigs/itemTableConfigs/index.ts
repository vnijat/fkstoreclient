import {ITableDataConfig} from '../../../containers/simpleTable/types';
import {Role} from '../../../enums/userRole';
import {Item} from '../../../types/item';

export const itemTableDataConfigs: ITableDataConfig<Item>[] = [
  {
    headerTitle: 'Name',
    dtoKey: 'name',
    type: 'text',
    hidden: false,
  },
  {
    headerTitle: 'Decsription',
    dtoKey: 'description',
    type: 'text',
    hidden: false,
  },
  {
    headerTitle: 'Category',
    dtoKey: 'category',
    isObject: true,
    objectDtoKey: 'title',
    type: 'text',
    hidden: false,
  },
  {
    headerTitle: 'Barcode',
    dtoKey: 'barcode',
    type: 'text',
    hidden: false,
    isAboveContextMenu: true,
  },
  {
    headerTitle: 'Color',
    dtoKey: 'color',
    type: 'text',
    isObject: true,
    objectDtoKey: 'name',
    hidden: false,
  },
  {
    headerTitle: 'Store',
    dtoKey: 'store',
    type: 'text',
    isObject: true,
    objectDtoKey: 'name',
    hidden: false,
  },
  {
    headerTitle: 'Unit',
    dtoKey: 'unit',
    type: 'text',
    isObject: true,
    objectDtoKey: 'name',
    hidden: false,
  },
  {
    headerTitle: 'Quantity',
    dtoKey: 'quantity',
    type: 'numeric',
    hidden: false,
  },
  {
    headerTitle: 'Cost Price',
    dtoKey: 'costPrice',
    type: 'money',
    hidden: false,
    accessRoles: [Role.SUPER_ADMIN, Role.MANAGER]
  },
  {
    headerTitle: 'Total Cost Price',
    dtoKey: 'totalCostPrice',
    type: 'money',
    hidden: false,
    accessRoles: [Role.SUPER_ADMIN, Role.MANAGER]
  },
  {
    headerTitle: 'Sell Price',
    dtoKey: 'sellPrice',
    type: 'money',
    hidden: true,
    accessRoles: [Role.SUPER_ADMIN, Role.MANAGER]
  },
  {
    headerTitle: 'Total Sell Price',
    dtoKey: 'totalSellPrice',
    type: 'money',
    hidden: true,
    accessRoles: [Role.SUPER_ADMIN, Role.MANAGER]
  },
  {
    headerTitle: 'Supplier',
    dtoKey: 'supplier',
    isObject: true,
    objectDtoKey: 'name',
    type: 'text',
    hidden: true,
  },
  {
    headerTitle: 'Store',
    dtoKey: 'store',
    isObject: true,
    objectDtoKey: 'name',
    type: 'text',
    hidden: true,
  },
  {
    headerTitle: 'Location',
    dtoKey: 'location',
    isObject: true,
    objectDtoKey: 'code',
    type: 'text',
    hidden: true,
  },
  {
    headerTitle: 'Label',
    dtoKey: 'label',
    isObject: true,
    objectDtoKey: 'name',
    type: 'text',
    hidden: true,
  },
];
