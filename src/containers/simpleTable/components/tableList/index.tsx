import React, { useCallback } from "react";
import { View, FlatList } from "react-native";
import { IContextMenuButton, ICustomColumn, ITableDataConfig, ITableRowData } from "../../types";
import TableRow from "../tableRow";





interface ITableList<T> {
    tableDataConfig: ITableDataConfig<T>[];
    tableData: T[];
    selectableRow?: boolean;
    contextMenuButtons?: IContextMenuButton<T>[];
    onPressRow?: (data: T, rowIndex: number) => void;
    customColumns?: ICustomColumn<T>;

}


const TableList = <T extends ITableRowData>({ tableDataConfig, tableData, contextMenuButtons, onPressRow, customColumns }: ITableList<T>) => {
    const listItem = useCallback(({ item, index }) => {
        return (
            <TableRow tableRowData={item} tableDataConfig={tableDataConfig} {...{ contextMenuButtons, onPressRow, customColumns }} rowIndex={index} />
        );
    }, [tableDataConfig, contextMenuButtons, customColumns]);

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={tableData}
                keyExtractor={(tableData, index) => `${index}-${tableData.id}`}
                renderItem={listItem}
            />
        </View>
    );
};

export default TableList;