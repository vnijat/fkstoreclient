import {IListHeader} from '../../../../types/common/common';

const HEADERS: IListHeader[] = [
  {title: 'No.', dtoKey: 'index'},
  {title: 'Supplier', dtoKey: 'supplierId'},
  {title: 'Payment Method', dtoKey: 'paymentMethod'},
  {title: 'PO-info', dtoKey: 'poInfo'},
  {title: 'Name', dtoKey: 'name'},
  {title: 'Barcode', dtoKey: 'barcode'},
  {title: 'Unit', dtoKey: 'unit'},
  {title: 'Price Per Unit', dtoKey: 'pricePerUnit'},
  {title: 'Update Price', dtoKey: 'updateMainPrice'},
  {title: 'Quantity', dtoKey: 'quantity'},
];

const ITEMS_FORORDER_LIST = {
  HEADERS,
};

export default ITEMS_FORORDER_LIST;
