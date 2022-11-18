import { InputsConfig } from "../../types/inputsconfig";

const label: InputsConfig[] = [
  {
    title: 'Name',
    dtoKey: 'name',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Name',
    height: 35,
    width: 230,
    multiLine: false,
  },
  {
    title: 'SKU',
    dtoKey: 'skuCode',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'SKU',
    height: 35,
    width: 230,
    multiLine: false,
  },
];

export {label};
