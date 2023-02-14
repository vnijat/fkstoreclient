import { useEffect, useRef, useState } from "react";
import { View, ScrollView, Animated } from "react-native";
import TableHeader from "./components/tableHeader";
import TableList from "./components/tableList";
import { IContextMenuButton, ICustomColumn, ITableDataConfig, ITableRowData } from "./types";




interface ISimpleTable<T> {
    tableDataConfig: ITableDataConfig<T>[],
    tableData: T[];
    selectableRow?: boolean;
    contextMenuButtons?: IContextMenuButton<T>[];
    onPressRow?: (data: T, rowIndex: number) => void;
    /**
     * Custom Colums Object each object keyName must be set at tableDataConfig "customColumnKey":
     * @example 
     * const tableDataConfig = [...{
     * headerTitle:'Action',
     * customColumnKey:'actionColumn',
     * hidden:false
     * },....]
     * const customColumns = {actionColumn:({data})=> <ActionColumn data={data}>} or  {actionColumn:ActionColumn}
     * 
     * <SimpleTable customColumns={customColumns}  />
     */
    customColumns?: ICustomColumn<T>;
}

const SimpleTable = <T extends ITableRowData>({ tableData, tableDataConfig, selectableRow, contextMenuButtons, onPressRow, customColumns }: ISimpleTable<T>) => {
    const listScrollOffset = new Animated.Value(0);
    const headerScrollRef = useRef(null);
    const listScrollRef = useRef(null);

    const listOnScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: listScrollOffset } } }],
        {
            useNativeDriver: true,
            listener(event) {
                const offsetX = event?.nativeEvent?.contentOffset.x;
                listScrollOffset.setValue(offsetX);
            },
        }
    );

    listScrollOffset.addListener(({ value }) => {
        headerScrollRef?.current.scrollTo({ x: value, animated: false });
    });


    return (
        <View style={{ flex: 1 }}>
            {tableDataConfig &&
                <>
                    <View style={{ flex: 0.1 }}>
                        <Animated.ScrollView horizontal ref={headerScrollRef}
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={false}
                        >
                            <TableHeader tableDataConfig={tableDataConfig} />
                        </Animated.ScrollView>
                    </View>
                    <View style={{ flex: 0.9 }}>
                        <Animated.ScrollView horizontal ref={listScrollRef} onScroll={listOnScroll} >
                            <TableList tableData={tableData} tableDataConfig={tableDataConfig}  {...{ contextMenuButtons, onPressRow, customColumns }} />
                        </Animated.ScrollView>
                    </View>
                </>
            }
        </View >
    );
};

export default SimpleTable;