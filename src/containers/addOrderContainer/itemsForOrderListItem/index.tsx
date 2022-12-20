import React from "react";
import { View } from "react-native";
import { Text } from "react-native-windows";
import { InputItem } from "../../../components/inputItem";
import { updateItemForOrder } from "../../../modules/redux/orderSlicer";
import { useAppDispatch } from "../../../modules/redux/store";
import { OrderItem } from "../../../types/projectOrder";
import { Colors } from "../../../utils/colors";
import EditableColumn from "./components/editableColumn";


interface IItemsForOrderListItem {
    orderItem: OrderItem;
    index?: number;
}


const ItemsForOrderListItem = ({ orderItem, index }: IItemsForOrderListItem) => {
    const dispatch = useAppDispatch();
    const rowData = [
        { value: (1 + (index ?? 0)) },
        { value: orderItem.name },
        { value: orderItem.barcode },
        { value: Number(orderItem.itemAtStock) },
        { value: orderItem.unit },
        { value: Number(orderItem.quantity), editable: true }
    ];


    const StaticColumn = ({ value, index }: { value: string | number; index?: number; }) => {
        const columnWidth = index == 0 ? 50 : 120;
        return (
            <View style={{ justifyContent: 'center', alignItems: 'flex-start', width: columnWidth, height: 30 }}>
                <Text style={{ color: Colors.DEFAULT_TEXT_COLOR, fontSize: 11 }}>
                    {value}
                </Text>
            </View>);
    };

    const handleOnChangeEditableColumn = (text: string) => {
        dispatch(updateItemForOrder({ ...orderItem, quantity: Number(text) }));
    };



    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', height: 40, alignItems: 'center', margin: 1, backgroundColor: Colors.CARD_COLOR }}>
            {rowData.map((data, index) => {
                if (data.editable) {
                    return <EditableColumn value={data?.value} setValue={(text) => handleOnChangeEditableColumn(text)} key={`${index}-editable`} atStock={orderItem?.itemAtStock} />;
                }
                else {
                    return <StaticColumn value={data.value ?? ''} key={`${index}-static`} index={index} />;
                }
            })}
        </View>
    );
};

export default ItemsForOrderListItem;