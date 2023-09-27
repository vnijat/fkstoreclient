import React, {useCallback} from "react";
import {View, FlatList, ActivityIndicator, useWindowDimensions} from "react-native";
import {Colors} from "../../../../utils/colors";
import {IContextMenuButton, ICustomColumn, ITableDataConfig, ITableRowData} from "../../types";
import TableRow from "../tableRow";





interface ITableList<T> {
    tableDataConfig: ITableDataConfig<T>[];
    tableData: T[];
    selectableRow?: boolean;
    contextMenuButtons?: IContextMenuButton<T>[];
    onPressRow?: (data: T, rowIndex: number) => void;
    customColumns?: ICustomColumn<T>;
    isLoading?: boolean;
    columnWidth?: number,
    rowHeight?: number;

}


const TableList = <T extends ITableRowData>({tableDataConfig, tableData, isLoading, rowHeight, columnWidth, contextMenuButtons, onPressRow, customColumns}: ITableList<T>) => {
    const {width} = useWindowDimensions();


    const listItem = useCallback(({item, index}) => {
        return (
            <TableRow tableRowData={item} tableDataConfig={tableDataConfig} {...{contextMenuButtons, onPressRow, rowHeight, columnWidth, customColumns, }} rowIndex={index} />
        );
    }, [tableDataConfig, contextMenuButtons, customColumns, rowHeight, columnWidth]);


    return (
        <View style={{flex: 1}}>
            {isLoading ?
                <View style={{width: width * 0.9, height: '100%', justifyContent: 'center'}}>
                    <ActivityIndicator size={'large'} color={Colors.DEFAULT_TEXT_COLOR} />
                </View>
                : < FlatList
                    data={tableData}
                    contentContainerStyle={{paddingVertical: 10}}
                    keyExtractor={(tableData, index) => `${index}-${tableData.id}`}
                    renderItem={listItem}
                />}
        </View>
    );
};

export default TableList;