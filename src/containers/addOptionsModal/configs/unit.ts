import {InputsConfig} from '../../../types/inputsconfig';

const unit: InputsConfig[] = [
  {
    title: 'Name',
    dtoKey: 'name',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Unit name ',
    height: 35,
    multiLine: false,
  },
  {
    title: 'Symbol',
    dtoKey: 'symbol',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Unit Symbol for example kg, kl ',
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

export {unit};
