import React, { useMemo } from "react";
import { Text, View } from "react-native";
import CustomPressable from "../../../../components/customPressable";
import { IContextMenuButton, ITableRowData } from "../../types";
import { getStyle } from "./styles";


interface ITableContextMenuContent<T> {
    contextMenuButtons: IContextMenuButton<T>[];
    rowIndex: number;
    tableRowData: T;
}


const TableContextMenuContent = <T extends ITableRowData>({ contextMenuButtons, tableRowData, rowIndex }: ITableContextMenuContent<T>) => {
    const style = useMemo(() => getStyle(), []);


    return (
        <View style={style.contextMenuContainer}>
            {contextMenuButtons.map((button, index) => {

                const onPressContextMenuItem = () => {
                    button.onPress(tableRowData, rowIndex);
                };
                return (
                    <CustomPressable
                        key={`${button.title}-${index}`}
                        style={style.contextMenuItem}
                        onPress={onPressContextMenuItem}
                        onHoverOpacity
                    >
                        <Text style={style.contextMenuItemText}>
                            {button.title}
                        </Text>
                    </CustomPressable>
                );
            })
            }
        </View>
    );


};


export default TableContextMenuContent;