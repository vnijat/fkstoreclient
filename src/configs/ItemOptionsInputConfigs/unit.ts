import { InputsConfig } from "../../types/inputsconfig";

const unit: InputsConfig[] = [
  {
    title: 'Name',
    dtoKey: 'name',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Unit name ',
    height: 35,
    multiLine: false,
    width: 150,
  },
  {
    title: 'Symbol',
    dtoKey: 'symbol',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Unit Symbol for example kg, kl ',
    height: 35,
    width: 150,
  },
];

export {unit};
