import CheckBox from "@react-native-community/checkbox";
import React, { useMemo, useRef, useState } from "react";
import { Text, View, TextInput, NativeSyntheticEvent, TextInputEndEditingEventData } from "react-native";
import { BarcodeIcon } from "../../../../../assets/icons/productIcons";
import { OrderItemStatus } from "../../../../../enums/orderItemStatus";
import { OrderStatus } from "../../../../../enums/orderStatus";
import { OrderItem } from "../../../../../types/projectOrder";
import { Colors } from "../../../../../utils/colors";
import FONT from "../../../../../utils/font";
import { getStyle } from "./styles";


interface IOrdersCartListCard {
    data: OrderItem;
    index: number;
    onValueChange?: (value: { data: { [k in keyof OrderItem]?: any }, itemId: number; }) => void;
}


const OrdersCartListCard = ({ data, index, onValueChange }: IOrdersCartListCard) => {
    const { name, barcode, itemId, fullfilled, unit, } = data;
    const style = useMemo(() => getStyle(), []);
    const quantityValue = parseFloat(data.quantity).toString();
    const inputBackground = useMemo(() => fullfilled ? 'transparent' : Colors.CARD_COLOR, [fullfilled]);

    const handleValueChange = (value: any, dtoKey: keyof OrderItem) => {
        let dataValue = value;
        if (dtoKey === 'quantity') {
            dataValue = (Number(value) > Number(data?.itemAtStock)) ? data.itemAtStock : (value === '') ? '0' : value;
        }
        onValueChange && onValueChange({ data: { [dtoKey]: dataValue, }, itemId });
    };

    const onEndEditingTextInput = (event: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
        const { nativeEvent: { text } } = event;
        handleValueChange(text, 'quantity');
    };

    const checkBoxesData = [
        { value: OrderItemStatus.USED, title: 'used', selected: data.status === OrderItemStatus.USED },
        { value: OrderItemStatus.SOLD, title: 'sold', selected: data.status === OrderItemStatus.SOLD }
    ];


    const handleCheckBoxValue = (index: number, checked: boolean) => {
        if (checked) {
            handleValueChange(checkBoxesData[index].value, 'status');
        }
    };


    return (
        <View style={{ height: 70, margin: 2, backgroundColor: Colors.CARD_HEADER_COLOR, elevation: 1, marginHorizontal: 5, borderRadius: 3, padding: 5 }}>
            <View style={{ position: 'absolute', top: 0, left: 0, width: 20, height: 20, padding: 2, backgroundColor: Colors.CARD_COLOR, borderRadius: 20, borderTopLeftRadius: 0, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: FONT.FONT_SIZE_VERY_SMALL, textAlign: 'center', color: Colors.DEFAULT_TEXT_COLOR, fontWeight: FONT.FONT_BOLD }}>
                    {index + 1}
                </Text>
            </View>
            <View style={{ flex: 1, }}>
                <View style={{ flex: 0.7, flexDirection: 'row' }}>
                    <View style={{ flex: 0.4 }}>
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_SMALL, color: Colors.DEFAULT_TEXT_COLOR }} adjustsFontSizeToFit>
                                {name}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.6, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginRight: 3, fontSize: FONT.FONT_SIZE_VERY_SMALL, color: Colors.DEFAULT_TEXT_COLOR }}>
                            {`${unit}`.toUpperCase()}
                        </Text>
                        <TextInput
                            keyboardType={'number-pad'}
                            onEndEditing={onEndEditingTextInput}
                            style={{ color: Colors.DEFAULT_TEXT_COLOR, backgroundColor: inputBackground, height: 30, padding: 1, marginRight: 5, borderRadius: 3, textAlign: 'center', minWidth: 30, fontSize: FONT.FONT_SIZE_SMALL }}
                            editable={!fullfilled}
                            maxLength={13}
                            defaultValue={quantityValue}
                        />
                    </View>
                </View>
                <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <BarcodeIcon />
                        <Text style={{ color: Colors.DEFAULT_TEXT_COLOR, fontWeight: FONT.FONT_BOLD, fontSize: FONT.FONT_SIZE_SMALL }}>
                            {barcode}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flexShrink: 1 }}>
                        {checkBoxesData.map((status, index) => {
                            if (!status.selected && fullfilled) {
                                return null;
                            }
                            return (
                                <View style={{ flexDirection: 'row', alignItems: 'center' }} key={`${index}`}>
                                    <Text style={{ color: Colors.DEFAULT_TEXT_COLOR, fontSize: FONT.FONT_SIZE_VERY_SMALL, }}>
                                        {status.title.toUpperCase()}
                                    </Text>
                                    <CheckBox
                                        onValueChange={(value) => handleCheckBoxValue(index, value)}
                                        value={status.selected}
                                        disabled={fullfilled}
                                        tintColors={{ true: fullfilled ? Colors.COMPLETED_COLOR : Colors.METALLIC_GOLD, false: Colors.CARD_COLOR }}
                                    />
                                </View>
                            );
                        })}
                    </View>
                </View>
            </View>
        </View>
    );
};


export default OrdersCartListCard;