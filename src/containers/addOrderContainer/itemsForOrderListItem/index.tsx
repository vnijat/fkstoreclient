import React, {useMemo} from "react";
import {View} from "react-native";
import {Text} from "react-native-windows";
import CustomContextMenu from "../../../components/customContextMenu";
import CustomPressable from "../../../components/customPressable";
import {InputItem} from "../../../components/inputItem/index.windows";
import {OrderItemStatus} from "../../../enums/orderItemStatus";
import {deleteItemFromOrder, updateItemForOrder} from "../../../modules/redux/orderSlicer";
import {useAppDispatch} from "../../../modules/redux/store";
import {IProjectsForPicker} from "../../../types/project";
import {Order, OrderItem} from "../../../types/projectOrder";
import {Colors} from "../../../utils/colors";
import EditableColumn from "./components/editableColumn";
import SelectableColumn from "./components/selectableColumn";
import StaticColumn from "./components/staticColumn";
import {getStyle} from "./style";


interface IItemsForOrderListItem {
    orderItem: OrderItem;
    index?: number;
    projectsData: IProjectsForPicker[];
}

interface IrowData {
    value: any;
    editable?: boolean;
    selectable?: boolean;
    selectableData?: {value: string | number, label: string;}[];
    searchEnabled?: boolean;
    dtoKey?: string;
    isDeselectEnabled?: boolean;
}


const ItemsForOrderListItem = ({orderItem, index, projectsData}: IItemsForOrderListItem) => {
    const style = useMemo(() => getStyle(), []);
    const dispatch = useAppDispatch();
    const orderItemStatusData = useMemo(() => {
        const values = Object.values(OrderItemStatus);
        const valuesWithoutInuse = values.filter(i => i !== OrderItemStatus.IN_USE);
        const orderItemSatusValues = orderItem.fullfilled ? valuesWithoutInuse : values;
        return orderItemSatusValues.map((status) => ({value: status, label: status.toUpperCase()}));
    }, [orderItem.fullfilled]);
    
    const rowData: IrowData[] = useMemo(() => [
        {value: (1 + (index ?? 0)), },
        {value: orderItem?.store?.name},
        {value: (orderItem.fullfilled && orderItem.project) ? `${orderItem.project?.title}` : orderItem.projectId, selectable: !orderItem.fullfilled, selectableData: projectsData, searchEnabled: true, dtoKey: 'projectId', isDeselectEnabled: true},
        {value: orderItem.name},
        {value: orderItem.barcode, },
        {value: Number(orderItem.itemAtStock)},
        {value: orderItem.unit, },
        {value: Number(orderItem.quantity), editable: !orderItem.fullfilled},
        {value: orderItem.status, selectable: !orderItem.fullfilled, selectableData: orderItemStatusData, dtoKey: 'status'},
    ], [orderItem.status, orderItem.projectId, orderItem.store, orderItem.project, orderItem.quantity, orderItem.fullfilled]);


    const handleOnChangeEditableColumn = (text: string) => {
        dispatch(updateItemForOrder({itemId: orderItem.itemId, data: {quantity: Number(text)}}));
    };

    const handleDeleteItemFromOrder = () => {
        if (orderItem.fullfilled) {
            return;
        }
        dispatch(deleteItemFromOrder({itemId: orderItem.itemId}));
    };


    const contextActionButtons = [
        {
            title: 'DELETE', onPress: handleDeleteItemFromOrder
        },
    ];

    const contextMenuContent = useMemo(() => {
        return (
            <View style={style.contextMenuContainer}>
                {contextActionButtons.map((button, index) => {
                    return (
                        <CustomPressable
                            key={`${button.title}-${index}`}
                            style={style.contextMenuItem}
                            onPress={button.onPress}
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
    }, [orderItem]);

    const getSelectedValue = (value: string, dtoKey: string) => {
        dispatch(updateItemForOrder({itemId: orderItem.itemId, data: {[dtoKey]: value}}));
    };

    const renderColumns = useMemo(() => {
        return rowData.map((data, index) => {
            if (data.editable) {
                return <EditableColumn
                    key={`${index}-editable`}
                    value={data?.value?.toString()}
                    setValue={handleOnChangeEditableColumn}
                    atStock={orderItem?.itemAtStock} />;
            }
            else if (data.selectable) {
                return <SelectableColumn
                    key={`${index}-selectable${data.dtoKey}`}
                    getValue={(value) => getSelectedValue(value, data.dtoKey!)}
                    selectedValue={data.value}
                    selectableData={data?.selectableData}
                    searchEnabled={data.searchEnabled}
                    isDeselectEnabled={data.isDeselectEnabled}
                />;
            }
            else {
                return <StaticColumn
                    key={`${index}-static`}
                    value={data.value ?? ''}
                    index={index} />;
            }
        });
    }, [orderItem]);

    return (
        <>
            <CustomPressable
                style={style.listItemContainer}>
                {!orderItem.fullfilled && <CustomContextMenu zIndex={2}>
                    {contextMenuContent}
                </CustomContextMenu>}
                {renderColumns}
            </CustomPressable>
        </>
    );
};

export default ItemsForOrderListItem;