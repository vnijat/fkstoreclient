import {ClientType} from '../../enums/clientType';
import {InputsConfig} from '../../types/inputsconfig';

const projectInputConfig: InputsConfig[] = [
  {
    title: 'Title',
    dtoKey: 'title',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Project Title',
    height: 35,
    multiLine: false,
    width: 470,
  },
  {
    title: 'Description',
    dtoKey: 'description',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Project Description',
    height: 35,
    multiLine: true,
    width: 230,
  },
  {
    title: 'Project Price',
    dtoKey: 'price',
    isNumeric: true,
    maxLength: 200,
    placeHolder: 'Project Price',
    height: 35,
    multiLine: false,
    width: 230,
  },
  {
    title: 'Paid By Client',
    dtoKey: 'paid',
    isNumeric: true,
    placeHolder: 'How Much Money Paid By Client',
    maxLength: 200,
    height: 35,
    multiLine: false,
    width: 230,
  },
  {
    title: 'Client',
    dtoKey: 'clientId',
    isNumeric: false,
    selectable: true,
    selectableDataKey: 'client',
    height: 35,
    width: 230,
  },
  {
    title: 'For Sample?',
    dtoKey: 'isSample',
    height: 35,
    width: 230,
    isCheckBox: true,
  },
  {
    title: 'Other Expenses',
    dtoKey: 'otherExpenses',
    isTableInput: true,
    tableConfig: [
      {
        headerTitle: 'TITLE',
        dtoKey: 'title',
      },
      {
        headerTitle: 'DESCRIPTION',
        dtoKey: 'description',
      },
      {
        headerTitle: 'COST',
        dtoKey: 'cost',
        isMoney: true,
        isSumTotal: true,
      },
    ],
  },
];

export {projectInputConfig};
