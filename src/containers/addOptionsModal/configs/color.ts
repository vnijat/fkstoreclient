import {InputsConfig} from '../../../types/inputsconfig';

const color: InputsConfig[] = [
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
    title: 'SKU',
    dtoKey: 'skuCode',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'SKU',
    height: 35,
    multiLine: false,
  },
];

export {color};
