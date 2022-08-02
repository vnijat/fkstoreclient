import {InputsConfig} from '../../../types/inputsconfig';

const location: InputsConfig[] = [
  {
    title: 'Code',
    isNumeric: false,
    dtoKey: 'code',
    maxLength: 200,
    placeHolder: 'Name',
    height: 35,
    multiLine: false,
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
