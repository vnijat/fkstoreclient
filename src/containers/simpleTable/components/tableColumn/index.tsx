import React from "react";
import { Text, View } from "react-native-windows";
import { Colors } from "../../../../utils/colors";
import { ITableDataTypes } from "../../types";
import DateColumn from "./columnComponents/date";
import MoneyColumn from "./columnComponents/money";
import NumericColumn from "./columnComponents/numeric";
import TextColumn from "./columnComponents/text";

interface ITableColumn {
    value: any;
    type: ITableDataTypes;
    columnWidth?: number;
}


const TableColumn = ({ value, type, columnWidth }: ITableColumn) => {

    const columns = {
        numeric: NumericColumn,
        money: MoneyColumn,
        text: TextColumn,
        date: DateColumn,
    };
    const ColumnComponent = columns[type];

    return (
        <View style={{ flex: 1, flexDirection: 'row', maxWidth: columnWidth || 250, minWidth: 200 }}>
            <ColumnComponent value={value} />
        </View>
    );

};

export default TableColumn;