import {ITableDataConfig} from '../../../containers/simpleTable/types';
import {Role} from '../../../enums/userRole';
import {Project} from '../../../types/project';
import {PurchaseDto} from '../../../types/purchase';

export const projectTableDataConfigs: ITableDataConfig<Project>[] = [
  {
    headerTitle: 'Date',
    dtoKey: 'createdAt',
    type: 'date',
    hidden: true,
  },
  {
    headerTitle: 'Project Code',
    dtoKey: 'projectCode',
    type: 'text',
    hidden: false,
    isAboveContextMenu: true,
  },
  {
    headerTitle: 'Client',
    hidden: false,
    customColumnKey: 'client',
  },
  {
    headerTitle: 'Title',
    dtoKey: 'title',
    type: 'text',
    hidden: false,
  },
  {
    headerTitle: 'Description',
    dtoKey: 'description',
    type: 'text',
    hidden: false,
  },
  {
    headerTitle: 'Project Orders',
    hidden: false,
    customColumnKey: 'order',
  },
  {
    headerTitle: 'Other Expenses',
    customColumnKey: 'otherExpenses',
    hidden: false,
    accessRoles: [Role.SUPER_ADMIN, Role.MANAGER]
  },
  {
    headerTitle: 'Orders Cost Total',
    dtoKey: 'ordersTotalCost',
    type: 'money',
    hidden: false,
    accessRoles: [Role.SUPER_ADMIN, Role.MANAGER]
  },
  {
    headerTitle: 'Other Expenses Cost',
    dtoKey: 'otherExpensesTotalCost',
    type: 'money',
    hidden: false,
    accessRoles: [Role.SUPER_ADMIN, Role.MANAGER]
  },
  {
    headerTitle: 'Expenses Total Cost',
    dtoKey: 'totalExpensesCost',
    type: 'money',
    hidden: false,
    accessRoles: [Role.SUPER_ADMIN, Role.MANAGER]
  },
  {
    headerTitle: 'Price',
    dtoKey: 'price',
    type: 'money',
    hidden: false,
    accessRoles: [Role.SUPER_ADMIN, Role.MANAGER]
  },
  {
    headerTitle: 'Paid',
    dtoKey: 'paid',
    type: 'money',
    hidden: true,
    accessRoles: [Role.SUPER_ADMIN, Role.MANAGER]
  },
  {
    headerTitle: 'Un Paid',
    dtoKey: 'unPaid',
    type: 'money',
    hidden: true,
    accessRoles: [Role.SUPER_ADMIN, Role.MANAGER]
  },
  {
    headerTitle: 'Payment Status',
    dtoKey: 'paymentStatus',
    type: 'text',
    hidden: true,
    accessRoles: [Role.SUPER_ADMIN, Role.MANAGER]
  },
  {
    headerTitle: 'Deadline',
    dtoKey: 'deadline',
    type: 'date',
    hidden: false,
  },
  {
    headerTitle: 'Status',
    hidden: false,
    customColumnKey: 'status',
  },
];
