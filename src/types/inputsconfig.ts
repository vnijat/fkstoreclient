import {ITableConfig} from '../containers/tableInput/types';

interface InputsConfig<T = any> {
  dtoKey?: keyof T;
  title?: string;
  isNumeric?: boolean;
  maxLength?: number;
  placeHolder?: string;
  width?: number;
  height?: number;
  multiLine?: boolean;
  selectable?: boolean;
  selectableDataKey?: string;
  requiredDataName?: string;
  requiredDataDtoKey?: string;
  requiredText?: string;
  isEnum?: boolean;
  isTableInput?: boolean;
  tableConfig?: ITableConfig<any>[];
  isCheckBox?: boolean;
  isDate?: boolean;
  isDisableForEdit?: boolean;
  isCode?: boolean;
  nullable?: boolean;
  enumData?: {label: string; value: string | number;}[];
  canSelectParent?: boolean;
  customComponentKeyName?: string;
  showOnlyInEdit?: boolean;
}

export type {InputsConfig};
