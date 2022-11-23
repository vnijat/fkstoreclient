import {ITableConfig, RowDataType} from '../containers/tableInput/types';

interface InputsConfig {
  dtoKey: string;
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
  enumData?: {label: string; value: string | number}[];
  isTableInput?: boolean;
  tableConfig?: ITableConfig[];
  isCheckBox?: boolean;
}

export type {InputsConfig};
