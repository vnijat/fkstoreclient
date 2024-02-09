import { InputsConfig } from "../../types/inputsconfig";

const color: InputsConfig[] = [
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
];

export {color};
