import {ITableDataConfig} from '../../../containers/simpleTable/types';
import {Role} from '../../../enums/userRole';
import {PurchaseDto} from '../../../types/purchase';

export const purchaseTableDataConfigs: ITableDataConfig<PurchaseDto>[] = [
  {
    headerTitle: 'Date',
    dtoKey: 'createdAt',
    type: 'date',
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
