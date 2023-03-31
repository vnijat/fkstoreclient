interface ITableConfig<T extends any> {
  headerTitle: string;
  dtoKey: keyof T;
  isNumber?: boolean;
  isMoney?: boolean;
  isSumTotal?: boolean;
  isDate?: boolean;
  /**
   * If data with dtokey is Object set true
   * Set objectDtokey for getting data from nestded object
   */
  isObject?: boolean;
  /**
   * MUST SET IF isObject is true
   * Set objectDtokey for getting data from nestded object
   */
  objectDtoKey?: boolean;
}

type RowDataType<T extends any> = {
  [key in keyof T]: any;
};

export type {ITableConfig, RowDataType};
