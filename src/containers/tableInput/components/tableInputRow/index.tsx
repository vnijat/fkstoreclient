import React, { memo, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { currency } from "../../../../utils/currency.windows";
import { ITableConfig, RowDataType, } from "../../types";
import ColumnInput from "../columnInput";
import { getStyle } from "./styles";


interface ITableInputRow<T> {
    getRowData: (rowData: RowDataType<T>) => void;
    defaultRowData: RowDataType<T>;
    tableInputConfigs: ITableConfig<T>[];
    isEditable?: boolean;
}


const TableInputRow = <T extends any>({ getRowData, defaultRowData, tableInputConfigs, isEditable }: ITableInputRow<T>) => {
    const style = useMemo(() => getStyle(), []);
    const [rowData, setRowData] = useState<RowDataType<T>>(defaultRowData);

    const setInputsDataForRow = (text: string, dtoKey: string) => {
        setRowData(prev => ({ ...prev, [dtoKey]: text }));
        getRowData({ ...rowData, [dtoKey]: text });
    };

    return (
        <View style={style.rowContainer}>
            {tableInputConfigs?.map(({ dtoKey, isNumber, isMoney, isSumTotal, isDate }, index) => {
                const inputValueFromRowData = ((isNumber || isMoney) && !!defaultRowData[dtoKey]?.length) ? Number(defaultRowData[dtoKey]).toString() : defaultRowData[dtoKey];
                return (
                    <ColumnInput
                        key={`${index}-${dtoKey as string}`}
                        getInputValue={(text: string) => setInputsDataForRow(text, dtoKey as string)}
                        inputValueFromRowData={inputValueFromRowData}
                        isNumber={isNumber}
                        isMoney={isMoney}
                        isEditable={isEditable}
                        isDate={isDate}
                    />
                );
            })}
        </View>);
};

export default memo(TableInputRow);;;