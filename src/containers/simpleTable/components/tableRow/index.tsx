import {ElementType, useMemo} from "react";
import {View} from "react-native-windows";
import CustomContextMenu from "../../../../components/customContextMenu";
import CustomPressable from "../../../../components/customPressable";
import {Colors} from "../../../../utils/colors";
import {IContextMenuButton, ICustomColumn, ITableDataConfig, ITableRowData} from "../../types";
import TableContextMenuContent from "../contextMenuContent";
import TableColumn from "../tableColumn";
import {getStyle} from "./styles";
import HELP from "../../../../services/helpers";




interface ITableRow<T> {
    tableRowData: T;
    tableDataConfig: ITableDataConfig<T>[];
    contextMenuButtons?: IContextMenuButton<T>[];
    rowIndex: number;
    onPressRow?: (data: T, rowIndex: number) => void;
    customColumns?: ICustomColumn<T>;
    rowHeight?: number;
    columnWidth?: number;
}


const TableRow = <T extends ITableRowData>({tableRowData, tableDataConfig, rowHeight, columnWidth, contextMenuButtons, rowIndex, onPressRow, customColumns}: ITableRow<T>) => {
    const style = useMemo(() => getStyle(rowHeight, columnWidth), [rowHeight, columnWidth]);
    const rowOnhoverOpacity = useMemo(() => !!contextMenuButtons?.length || !!onPressRow, [contextMenuButtons, onPressRow]);

    const handleRowOnpress = () => {
        onPressRow && onPressRow(tableRowData, rowIndex);
    };
    return (
        <CustomPressable
            style={style.container}
            onHoverOpacity={rowOnhoverOpacity}
            onPress={handleRowOnpress}
        >
            {!!contextMenuButtons?.length &&
                <CustomContextMenu >
                    <TableContextMenuContent
                        contextMenuButtons={contextMenuButtons}
                        rowIndex={rowIndex}
                        tableRowData={tableRowData}
                    />
                </CustomContextMenu>}
            {tableDataConfig.map((tableConfig, index) => {
                const {dtoKey, isObject, objectDtoKey, type, customColumnKey, isAboveContextMenu, } = tableConfig;
                const hasPermission = tableConfig.accessRoles ? HELP.hasPermission(tableConfig.accessRoles) : true;
                if (!hasPermission || tableConfig?.hidden) return null;
                const value = dtoKey ? (isObject ? (tableRowData[dtoKey] ? tableRowData[dtoKey][objectDtoKey!] : '-') : tableRowData[dtoKey]) : tableRowData;
                if (customColumnKey && customColumns && customColumns[customColumnKey]) {
                    const CustomColumn = customColumns[customColumnKey];
                    return (
                        <View style={style.customColumnContainer} key={`${index}`}  >
                            <CustomColumn data={tableRowData} />
                        </View>
                    );
                } else if (type) {
                    return (
                        <TableColumn key={`${index}`} value={value} type={type} columnWidth={columnWidth} {...{isAboveContextMenu}} />
                    );
                } else {
                    return null;
                }
            })}

        </CustomPressable>
    );

};

export default TableRow;;