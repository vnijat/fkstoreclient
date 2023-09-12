import {ClientType} from '../../enums/clientType';
import {ProjectStatus} from '../../enums/projectStatus';
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
    width: 455,
  },
  {
    title: 'Description',
    dtoKey: 'description',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Project Description',
    height: 35,
    multiLine: true,
    width: 455,
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
    nullable: true,
  },
  {
    title: 'DeadLine',
    dtoKey: 'deadline',
    height: 35,
    width: 250,
    isDate: true,
  },
  {
    title: 'Status',
    dtoKey: 'status',
    height: 35,
    width: 250,
    selectable: true,
    isEnum: true,
    enumData: Object.values(ProjectStatus).map(type => ({
      label: type,
      value: type,
    })),
  },
  {
    title: 'Project Type',
    dtoKey: 'typeId',
    customComponentKeyName: 'type',
    isDisableForEdit: true,
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
