import {IListHeader} from '../../../../types/common/common';

const HEADERS: IListHeader[] = [
  {title: 'No.', dtoKey: 'index'},
  {title: 'Store', dtoKey: 'storeId'},
  {title: 'For Project', dtoKey: 'projectId'},
  {title: 'Name', dtoKey: 'name'},
  {title: 'Barcode', dtoKey: 'barcode'},   
  {title: 'At Stock', dtoKey: 'itemAtStock'},
  {title: 'Unit', dtoKey: 'unit'},
  {title: 'Quantity', dtoKey: 'quantity'},
  {title: 'Status', dtoKey: 'status'},
];

const ITEMS_FORORDER_LIST = {
  HEADERS,
};

export default ITEMS_FORORDER_LIST;
