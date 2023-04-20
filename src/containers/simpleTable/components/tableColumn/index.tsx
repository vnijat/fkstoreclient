import React, { useMemo } from "react";
import { Text, View } from "react-native-windows";
import { Colors } from "../../../../utils/colors";
import { ITableDataTypes } from "../../types";
import DateColumn from "./columnComponents/date";
import MoneyColumn from "./columnComponents/money";
import NumericColumn from "./columnComponents/numeric";
import TextColumn from "./columnComponents/text";
import { getStyle } from "./style";

interface ITableColumn {
    value: any;
    type: ITableDataTypes;
    columnWidth?: number;
    isAboveContextMenu?: boolean;
}


const TableColumn = ({ value, type, columnWidth, isAboveContextMenu }: ITableColumn) => {
    const zIndex = isAboveContextMenu ? 3 : 0;
    const style = useMemo(() => getStyle(zIndex, columnWidth), [zIndex, columnWidth]);
    const onStartShouldSetResponder = () => !!isAboveContextMenu;
    const columns = {
        numeric: NumericColumn,
        money: MoneyColumn,
        text: TextColumn,
        date: DateColumn,
    };
    const ColumnComponent = columns[type];

    return (
        <View onStartShouldSetResponder={onStartShouldSetResponder} style={style.container}>
            <ColumnComponent value={value} />
        </View>
    );

};

export default TableColumn;