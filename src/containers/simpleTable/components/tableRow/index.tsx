import { ElementType, useMemo } from "react";
import { View } from "react-native-windows";
import CustomContextMenu from "../../../../components/customContextMenu";
import CustomPressable from "../../../../components/customPressable";
import { Colors } from "../../../../utils/colors";
import { IContextMenuButton, ICustomColumn, ITableDataConfig, ITableRowData } from "../../types";
import TableContextMenuContent from "../contextMenuContent";
import TableColumn from "../tableColumn";
import { getStyle } from "./styles";




interface ITableRow<T> {
    tableRowData: T;
    tableDataConfig: ITableDataConfig<T>[];
    contextMenuButtons?: IContextMenuButton<T>[];
    rowIndex: number;
    onPressRow?: (data: T, rowIndex: number) => void;
    customColumns?: ICustomColumn<T>;
}


const TableRow = <T extends ITableRowData>({ tableRowData, tableDataConfig, contextMenuButtons, rowIndex, onPressRow, customColumns }: ITableRow<T>) => {
    const style = useMemo(() => getStyle(), []);


    const handleRowOnpress = () => {
        onPressRow && onPressRow(tableRowData, rowIndex);
    };


    return (
        <CustomPressable
            style={style.container}
            onHoverOpacity
            onPress={handleRowOnpress}
        >
            {contextMenuButtons?.length &&
                <CustomContextMenu >
                    <TableContextMenuContent
                        contextMenuButtons={contextMenuButtons}
                        rowIndex={rowIndex}
                        tableRowData={tableRowData}
                    />
                </CustomContextMenu>}
            {tableDataConfig.map((tableConfig, index) => {
                const { dtoKey, isObject, objectDtoKey, type, customColumnKey } = tableConfig;
                if (tableConfig?.hidden) return null;
                const value = dtoKey ? (isObject ? tableRowData[dtoKey][objectDtoKey!] : tableRowData[dtoKey]) : tableRowData;
                if (customColumnKey && customColumns && customColumns[customColumnKey]) {
                    const CustomColumn = customColumns[customColumnKey];
                    return (
                        <View style={{ minWidth: 200 }} key={`${index}`}>
                            <CustomColumn data={tableRowData} />
                        </View>
                    );
                } else if (type) {
                    return (
                        <TableColumn key={`${index}`} value={value} type={type} />
                    );
                } else {
                    return null;
                }
            })}

        </CustomPressable>
    );

};

export default TableRow;;