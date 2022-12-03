import { ClientType } from "../../enums/clientType";
import { InputsConfig } from "../../types/inputsconfig";

const clientInputs: InputsConfig[] = [
  {
    title: 'Company Name',
    dtoKey: 'companyName',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Company Name',
    height: 35,
    multiLine: false,
    width: 470,
  },
  {
    title: 'First Name',
    dtoKey: 'firstName',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'First Name',
    height: 35,
    multiLine: false,
    width: 230,
  },
  {
    title: 'Last Name',
    dtoKey: 'lastName',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Last Name',
    height: 35,
    multiLine: false,
    width: 230,
  },
  {
    title: 'Email',
    dtoKey: 'email',
    isNumeric: false,
    placeHolder: 'Email',
    maxLength: 200,
    height: 35,
    multiLine: false,
    width: 230,
  },
  {
    title: 'Phone',
    dtoKey: 'phone',
    isNumeric: false,
    placeHolder: 'Phone',
    maxLength: 200,
    height: 35,
    multiLine: false,
    width: 230,
  },
  {
    title: 'Client Type',
    dtoKey: 'type',
    isNumeric: false,
    height: 40,
    width: 100,
    selectable: true,
    isEnum: true,
    enumData: Object.values(ClientType).map(type => ({
      label: type,
      value: type,
    })),
  },
];

export {clientInputs};
