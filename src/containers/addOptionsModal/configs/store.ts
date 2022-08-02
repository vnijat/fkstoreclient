import {InputsConfig} from '../../../types/inputsconfig';

const store: InputsConfig[] = [
  {
    title: 'Name',
    dtoKey: 'name',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Name',
    height: 35,
    multiLine: false,
  },
  {
    title: 'Description',
    dtoKey: 'description',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Description',
    height: 150,
    multiLine: true,
  },
  {
    title: 'Address',
    dtoKey: 'address',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Address',
    height: 35,
  },
  {
    title: 'Phone',
    dtoKey: 'phone',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Phone',
    height: 35,
  },
  {
    title: 'SKU',
    dtoKey: 'skuCode',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'SKU',
    height: 35,
  },
  
];

export {store};
