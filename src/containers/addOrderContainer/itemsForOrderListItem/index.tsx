import React, { useMemo } from "react";
import { View } from "react-native";
import { Text } from "react-native-windows";
import CustomContextMenu from "../../../components/customContextMenu";
import CustomPressable from "../../../components/customPressable";
import { InputItem } from "../../../components/inputItem/index.windows";
import { OrderItemStatus } from "../../../enums/orderItemStatus";
import { deleteItemFromOrder, updateItemForOrder } from "../../../modules/redux/orderSlicer";
import { useAppDispatch } from "../../../modules/redux/store";
import { OrderItem } from "../../../types/projectOrder";
import { Colors } from "../../../utils/colors";
import EditableColumn from "./components/editableColumn";
import SelectableColumn from "./components/selectableColumn";
import StaticColumn from "./components/staticColumn";
import { getStyle } from "./style";


interface IItemsForOrderListItem {
    orderItem: OrderItem;
    index?: number;
}

interface IrowData {
    value: any;
    editable?: boolean;
    selectable?: boolean;
    selectableData?: { value: string; label: string; }[];
}


const ItemsForOrderListItem = ({ orderItem, index }: IItemsForOrderListItem) => {
    const style = useMemo(() => getStyle(), []);
    const dispatch = useAppDispatch();
    const rowData: IrowData[] = [
        { value: (1 + (index ?? 0)) },
        { value: orderItem.name },
        { value: orderItem.barcode },
        { value: Number(orderItem.itemAtStock) },
        { value: orderItem.unit },
        { value: Number(orderItem.quantity), editable: true },
        { value: orderItem.status, selectable: true, selectableData: Object.keys(OrderItemStatus).map((key) => ({ label: OrderItemStatus[key as keyof typeof OrderItemStatus], value: OrderItemStatus[key as keyof typeof OrderItemStatus] })) }
    ];

    const handleOnChangeEditableColumn = (text: string) => {
        dispatch(updateItemForOrder({ ...orderItem, quantity: Number(text) }));
    };

    const handleDeleteItemFromOrder = () => {
        dispatch(deleteItemFromOrder({ itemId: orderItem.itemId }));
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

    const getSelectedValue = (value: string) => {
        dispatch(updateItemForOrder({ ...orderItem, status: value as OrderItemStatus }));
    };

    const renderColumns = useMemo(() => {
        return rowData.map((data, index) => {
            if (data.editable) {
                return <EditableColumn value={data?.value?.toString()} setValue={handleOnChangeEditableColumn} key={`${index}-editable`} atStock={orderItem?.itemAtStock} />;
            }
            else if (data.selectable) {
                return <SelectableColumn getValue={getSelectedValue} selectedValue={data.value} selectableData={data?.selectableData} key={`${index}-selectable`} />;
            }
            else {
                return <StaticColumn value={data.value ?? ''} key={`${index}-static`} index={index} />;
            }
        });
    }, [orderItem]);

    return (
        <>
            <CustomPressable
                style={style.listItemContainer}>
                <CustomContextMenu zIndex={2}>
                    {contextMenuContent}
                </CustomContextMenu>
                {renderColumns}
            </CustomPressable>
        </>
    );
};

export default ItemsForOrderListItem;