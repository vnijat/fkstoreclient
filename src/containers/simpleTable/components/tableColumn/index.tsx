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
}


const TableColumn = ({ value, type }: ITableColumn) => {
  
    const columns = {
        numeric: NumericColumn,
        money: MoneyColumn,
        text: TextColumn,
        date: DateColumn,
    };
    const ColumnComponent = columns[type];

    return (
        <View style={{ minWidth: 200, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'transparent' }}>
            <ColumnComponent value={value} />
        </View>
    );

};

export default TableColumn;