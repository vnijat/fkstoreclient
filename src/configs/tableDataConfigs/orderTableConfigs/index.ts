import {ITableDataConfig} from '../../../containers/simpleTable/types';
import {Role} from '../../../enums/userRole';
import {Item} from '../../../types/item';
import {ProjectOrder} from '../../../types/projectOrder';

export const orderTableDataConfigs: ITableDataConfig<ProjectOrder>[] = [
  {
    headerTitle: 'Date',
    dtoKey: 'createdAt',
    type: 'date',
    hidden: false,
  },
  {
    headerTitle: 'Order ID',
    dtoKey: 'id',
    type: 'numeric',
    hidden: false,
  },
  {
    headerTitle: 'Detail',
    dtoKey: 'detail',
    type: 'text',
    hidden: false,
  },
  {
    headerTitle: 'Total products',
    dtoKey: 'totalItems',
    type: 'numeric',
    hidden: false,
  },
  {
    headerTitle: 'Total price',
    dtoKey: 'totalPrice',
    type: 'money',
    hidden: false,
    accessRoles: [Role.SUPER_ADMIN, Role.MANAGER]
  },
  {
    headerTitle: 'Status',
    dtoKey: 'status',
    type: 'text',
    hidden: false,
  },
];
