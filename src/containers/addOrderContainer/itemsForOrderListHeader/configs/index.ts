import {IListHeader} from '../../../../types/common/common';

const HEADERS = (hideHeaders: {[key: string]: boolean;}): IListHeader[] => [
  {title: 'No.', dtoKey: 'index', isHidden: hideHeaders['index']},
  {title: 'Store', dtoKey: 'storeId', isHidden: hideHeaders['storeId']},
  {title: 'Project Code', dtoKey: 'projectId', isHidden: hideHeaders['projectId']},
  {title: 'Name', dtoKey: 'name', isHidden: hideHeaders['name']},
  {title: 'Barcode', dtoKey: 'barcode', isHidden: hideHeaders['barcode']},
  {title: 'Initial Stock', dtoKey: 'itemAtStock', isHidden: hideHeaders['itemAtStock']},
  {title: 'Unit', dtoKey: 'unit', isHidden: hideHeaders['unit']},
  {title: 'Quantity', dtoKey: 'quantity', isHidden: hideHeaders['quantity']},
  {title: 'Status', dtoKey: 'status', isHidden: hideHeaders['status']},
];

const ITEMS_FORORDER_LIST = {
  HEADERS,
};

export default ITEMS_FORORDER_LIST;
