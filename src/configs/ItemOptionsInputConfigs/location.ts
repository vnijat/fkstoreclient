import { InputsConfig } from "../../types/inputsconfig";

const location: InputsConfig[] = [
  {
    title: 'Code',
    isNumeric: false,
    dtoKey: 'code',
    maxLength: 200,
    placeHolder: 'Name',
    height: 35,
    width: 150,
    multiLine: false,
  },
  {
    title: 'Store',
    dtoKey: 'storeId',
    isNumeric: false,
    maxLength: 200,
    selectable: true,
    height: 35,
    selectableDataKey: 'store',
    width: 150,
  },
];

export {location};
