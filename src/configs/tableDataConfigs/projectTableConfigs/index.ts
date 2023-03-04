import {ITableDataConfig} from '../../../containers/simpleTable/types';
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
    headerTitle: 'Orders Cost Total',
    dtoKey: 'ordersTotalCost',
    type: 'money',
    hidden: false,
  },
  {
    headerTitle: 'Total price',
    dtoKey: 'totalPrice',
    type: 'money',
    hidden: false,
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
