interface ITableConfig {
  headerTitle: string;
  dtoKey: string;
  isNumber?: boolean;
  isMoney?: boolean;
  isSumTotal?: boolean;
}

type RowDataType = {
  [key: string]: any;
};

export type {ITableConfig, RowDataType};
