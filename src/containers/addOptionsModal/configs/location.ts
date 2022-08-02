import {InputsConfig} from '../../../types/inputsconfig';

const location: InputsConfig[] = [
  {
    title: 'Name',
    isNumeric: false,
    dtoKey: 'name',
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
    title: 'SKU',
    dtoKey: 'skuCode',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'SKU',
    height: 35,
  },
];

export {location};
