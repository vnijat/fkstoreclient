import {InputsConfig} from '../../../types/inputsconfig';

const barcode: InputsConfig[] = [
  {
    title: 'Сode',
    dtoKey: 'code',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'code',
    height: 35,
    multiLine: false,
  },
];

export {barcode};
