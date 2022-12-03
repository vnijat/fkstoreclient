import { InputsConfig } from "../../types/inputsconfig";

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
    title: 'SKU',
    dtoKey: 'skuCode',
    isNumeric: false,
    maxLength: 200,
    placeHolder: 'SKU',
    width: 150,
    height: 35,
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
  },
];

export {category};