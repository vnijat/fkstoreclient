import React, { memo, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { currency } from "../../../../utils/currency";
import { ITableConfig, RowDataType, } from "../../types";
import ColumnInput from "../columnInput";
import { getStyle } from "./styles";


interface ITableInputRow {
    getRowData: (rowData: RowDataType) => void;
    defaultRowData: RowDataType;
    tableInputConfigs: ITableConfig[];
}


const TableInputRow = ({ getRowData, defaultRowData, tableInputConfigs }: ITableInputRow) => {
    const style = useMemo(() => getStyle(), []);
    const [rowData, setRowData] = useState<RowDataType>(defaultRowData);

    const setInputsDataForRow = (text: string, dtoKey: string) => {
        setRowData(prev => ({ ...prev, [dtoKey]: text }));
        getRowData({ ...rowData, [dtoKey]: text });
    };

    return (
        <View style={style.rowContainer}>
            {tableInputConfigs?.map(({ dtoKey, isNumber, isMoney, isSumTotal }, index) => {
                const inputValueFromRowData = ((isNumber || isMoney) && !!defaultRowData[dtoKey]?.length) ? Number(defaultRowData[dtoKey]).toString() : defaultRowData[dtoKey];
                return (
                    <ColumnInput
                        key={`${index}-${dtoKey}`}
                        getInputValue={(text: string) => setInputsDataForRow(text, dtoKey)}
                        inputValueFromRowData={inputValueFromRowData}
                        isNumber={isNumber}
                        isMoney={isMoney}
                    />
                );
            })}
        </View>);
};

export default memo(TableInputRow);