import HELP from '../../services/helpers';
import {InputsConfig} from '../../types/inputsconfig';


const supplier: InputsConfig[] = [
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
    title: 'Address',
    dtoKey: 'address',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Address',
    width: 230,
    height: 35,
  },
  {
    title: 'Phone',
    dtoKey: 'phone',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Phone',
    width: 230,
    height: 35,
  },
  {
    title: 'Email',
    dtoKey: 'email',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Email',
    width: 230,
    height: 35,
  },
  {
    title: 'Country',
    dtoKey: 'country',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Country',
    selectable: true,
    isEnum: true,
    enumData: HELP.getCountriesForPicker(),
    width: 230,
    height: 35,
  },
];

export {supplier};
