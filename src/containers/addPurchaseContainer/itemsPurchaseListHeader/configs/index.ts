import {IListHeader} from '../../../../types/common/common';

const HEADERS: IListHeader[] = [
  {title: 'No.', dtoKey: 'index'},
  {title: 'Name', dtoKey: 'name'},
  {title: 'Barcode', dtoKey: 'barcode'},
  {title: 'Unit', dtoKey: 'unit'},
  {title: 'Price Per Unit', dtoKey: 'pricePerUnit'},
  {title: 'Quantity', dtoKey: 'quantity'},
  {title: 'Supplier', dtoKey: 'supplierId'},
];

const ITEMS_FORORDER_LIST = {
  HEADERS,
};

export default ITEMS_FORORDER_LIST;
