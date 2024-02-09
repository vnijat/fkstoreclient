import {InputsConfig} from '../../types/inputsconfig';

const category: InputsConfig[] = [
  {
    title: 'Title',
    dtoKey: 'title',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Title',
    height: 35,
    width: 150,
    multiLine: false,
  },
  {
    title: 'CODE',
    dtoKey: 'code',
    placeHolder: 'CODE NEEDED WHEN GENERATE BARCODE',
    isNumeric: false,
    maxLength: 3,
    width: 150,
    height: 35,
    isDisableForEdit: true,
  },
  {
    title: 'Parent Category',
    dtoKey: 'parentCategoryId',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'Parent Category',
    width: 150,
    height: 35,
    selectable: true,
    selectableDataKey: 'category',
    isDisableForEdit: true,
    canSelectParent: true,
  },
];

export {category};
