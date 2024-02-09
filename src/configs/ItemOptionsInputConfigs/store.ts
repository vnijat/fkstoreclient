import { InputsConfig } from "../../types/inputsconfig";

const store: InputsConfig[] = [
  {
    title: 'Name',
    dtoKey: 'name',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Name',
    height: 35,
    width: 460,
    multiLine: false,
  },
  {
    title: 'Description',
    dtoKey: 'description',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Description',
    height: 100,
    width: 460,
    multiLine: true,
  },
  {
    title: 'Address',
    dtoKey: 'address',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Address',
    width: 140,
    height: 35,
  },
  {
    title: 'Phone',
    dtoKey: 'phone',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Phone',
    height: 35,
    width: 140,
  },
];

export {store};
