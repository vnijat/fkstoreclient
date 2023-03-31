import { useEffect, useMemo, useRef, useState } from "react";
import { View, ScrollView, Animated, Text, useWindowDimensions } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import CustomPressable from "../../components/customPressable";
import HELP from "../../services/helpers";
import { Colors } from "../../utils/colors";
import FONT from "../../utils/font";
import ActionModal from "../clientCard/components/actionModal";
import TableColumnsEditModal from "../tableColumnsEditModal";
import TableHeader from "./components/tableHeader";
import TableList from "./components/tableList";
import { getStyle } from "./style";
import { IContextMenuButton, ICustomColumn, ITableDataConfig, ITableRowData } from "./types";




interface ISimpleTable<T> {
    tableDataConfig: ITableDataConfig<T>[],
    /**
     * Table name for editable tableconfig name is key of tableconfig states from redux
     * if not set table table edit will not show
     */
    tableData: T[];
    selectableRow?: boolean;
    contextMenuButtons?: IContextMenuButton<T>[];
    getNewTableConfig?: (configs: ITableDataConfig<T>[]) => void;
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
    /**
     * callBack when press reset Table to default configs
     */
    onResetTable?: () => void;

    /**
     * Is table data loading
     */
    isLoading?: boolean;
    rowHeight?: number;
    columnWidth?: number;
}

const SimpleTable = <T extends ITableRowData>({ tableData, tableDataConfig, rowHeight, columnWidth, selectableRow, isLoading, contextMenuButtons, onResetTable, onPressRow, customColumns, getNewTableConfig }: ISimpleTable<T>) => {
    const listScrollOffset = new Animated.Value(0);
    const headerScrollRef = useRef(null);
    const listScrollRef = useRef(null);
    const style = useMemo(() => getStyle(), []);
    const [showEditModal, setShowEditModal] = useState(false);
    const [tableConfigs, setTableConfigs] = useState([...tableDataConfig]);
    const isTableChanged = JSON.stringify(tableConfigs) !== JSON.stringify(tableDataConfig);

    useEffect(() => {
        setTableConfigs([...tableDataConfig]);
    }, [tableDataConfig]);

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

    const onCloseEditModal = () => {
        setShowEditModal(false);
        if (isTableChanged) {
            getNewTableConfig && getNewTableConfig(tableConfigs);
            HELP.showToast('info', 'Table Config Changed', 'Changed');
        }
    };

    const actionModalPressable = () => {
        return (
            <View style={{}}>
                <Icon name={'dots-three-vertical'} size={20} color={Colors.METALLIC_GOLD} />
            </View>
        );
    };


    const hanldeResetTable = () => {
        if (!showEditModal) {
            onResetTable && onResetTable();
            HELP.showToast('info', 'Table Config Resetted', 'RESET');
        }
    };

    const handleEditTable = () => {
        setShowEditModal(true);
    };

    const actionModalItems: { title: string; onPress: () => void; }[] = [{
        title: 'Edit table',
        onPress: handleEditTable
    },
    {
        title: 'Reset Table',
        onPress: hanldeResetTable
    }
    ];


    const actionModalContent = useMemo(() => {
        return (
            <View style={style.actionModalContent}>
                {actionModalItems.map((item, index) => {
                    return (
                        <CustomPressable
                            key={`${index}`}
                            onHoverOpacity
                            style={style.actionModalItem}
                            onPress={item.onPress}
                        >
                            <Text style={style.actionModalItemText}>
                                {item.title.toUpperCase()}
                            </Text>
                        </CustomPressable>
                    );
                })}
            </View>);
    }, [actionModalItems]);


    return (
        <View style={{ flex: 1 }}>
            {tableDataConfig &&
                <>
                    {showEditModal && <TableColumnsEditModal onClose={onCloseEditModal} isSwohModal={showEditModal} tableDataConfigs={tableConfigs} getTableConfigsNewState={(newState) => setTableConfigs([...newState])} />}
                    <View style={{ flex: 0.1 }}>
                        {getNewTableConfig && <View style={style.tableConfigButton} >
                            <ActionModal pressableComponent={actionModalPressable} >
                                {actionModalContent}
                            </ActionModal>
                        </View>}
                        <Animated.ScrollView horizontal ref={headerScrollRef}
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={false}
                            contentContainerStyle={{ flexGrow: 1 }}
                        >
                            <TableHeader tableDataConfig={tableConfigs} {...{ rowHeight, columnWidth, }} />
                        </Animated.ScrollView>
                    </View>
                    <View style={{ flex: 0.9 }}>
                        <Animated.ScrollView
                            horizontal
                            ref={listScrollRef}
                            onScroll={listOnScroll}
                            contentContainerStyle={{ flexGrow: 1 }}
                        >
                            <TableList tableData={tableData} tableDataConfig={tableConfigs}  {...{ contextMenuButtons, onPressRow, customColumns, isLoading, rowHeight, columnWidth, }} />
                        </Animated.ScrollView>
                    </View>
                </>
            }
        </View >
    );
};

export default SimpleTable;