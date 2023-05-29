import CheckBox from "@react-native-community/checkbox";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Text, View, TextInput, NativeSyntheticEvent, TextInputEndEditingEventData } from "react-native";
import { BarcodeIcon } from "../../../../../assets/icons/productIcons";
import { OrderItemStatus } from "../../../../../enums/orderItemStatus";
import { OrderStatus } from "../../../../../enums/orderStatus";
import { OrderItem } from "../../../../../types/projectOrder";
import { Colors } from "../../../../../utils/colors";
import FONT from "../../../../../utils/font";
import { getStyle } from "./styles";
import SwipeableItem from 'react-native-swipeable-item';
import { Swipeable } from "react-native-gesture-handler";
import CustomPressable from "../../../../../components/customPressable";

interface IOrdersCartListCard {
    data: OrderItem;
    index: number;
    onValueChange?: (value: { data: { [k in keyof OrderItem]?: any }, itemId: number; }) => void;
    handleRemove?: (itemId: number) => void;
}


const OrdersCartListCard = ({ data, index, onValueChange, handleRemove }: IOrdersCartListCard) => {
    const { name, barcode, itemId, fullfilled, unit, itemAtStock } = data;
    const style = useMemo(() => getStyle(fullfilled), [fullfilled]);
    const quantityValue = useMemo(() => parseFloat(data.quantity).toString(), [data.quantity]);
    const swipeRef = useRef<Swipeable>(null);
    const quantityInputRef = useRef<TextInput>(null);

    const handleValueChange = (value: any, dtoKey: keyof OrderItem) => {
        let dataValue = value;
        if (dtoKey === 'quantity') {
            dataValue = (Number(value) > Number(data?.itemAtStock)) ? data.itemAtStock : (value === '') ? '0' : value;
            quantityInputRef.current?.setNativeProps({ text: parseFloat(dataValue).toString() });
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


    const renderAvailableAtStock = useMemo(() => {
        if (fullfilled) {
            return null;
        }
        return (<View style={style.atStockContainer}>
            <Text style={style.atStockText}>
                {`${parseFloat(itemAtStock?.toString() ?? 0)}`.toUpperCase()}
                <Text style={{ fontSize: FONT.FONT_SIZE_VERY_SMALL, }}>
                    {` max.`.toUpperCase()}
                </Text>
            </Text>
        </View>);
    }, [itemAtStock, fullfilled]);

    const renderInput = useMemo(() => {
        return (
            <TextInput
                ref={quantityInputRef}
                keyboardType={'number-pad'}
                onEndEditing={onEndEditingTextInput}
                style={style.quantityInput}
                editable={!fullfilled}
                maxLength={13}
                defaultValue={quantityValue}
            />
        );
    }, [quantityValue, fullfilled, onEndEditingTextInput]);



    const onPressRemove = useCallback(() => {
        swipeRef.current?.close();
        handleRemove && handleRemove(itemId);
    }, []);


    const CardContainer = () => {
        return (
            <View style={style.cartItemContainer}>
                <View style={style.cartItemNumber}>
                    <Text style={style.cartItemNumberText}>
                        {index + 1}
                    </Text>
                </View>
                {renderAvailableAtStock}
                <View style={style.cartItemContentContainer}>
                    <View style={style.contentTop}>
                        <View style={style.contentTopLeft}>
                            <View style={style.productNameContainer}>
                                <Text style={style.productNameText} adjustsFontSizeToFit>
                                    {name}
                                </Text>
                            </View>
                        </View>
                        <View style={style.contentTopRight}>
                            <Text style={style.productUnitText}>
                                {`${unit}`.toUpperCase()}
                            </Text>
                            {renderInput}
                        </View>
                    </View>
                    <View style={style.contentBottom}>
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


    const renderRightAction = () => {
        if (fullfilled) {
            return null;
        }
        return (
            <View style={{}}>
                <CustomPressable
                    onPress={onPressRemove}
                    style={{ width: 80, height: 80, backgroundColor: Colors.DECLINED_COLOR, justifyContent: "center", alignItems: 'center', margin: 2, borderRadius: 3, padding: 2 }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_MEDIUM, color: Colors.CARD_COLOR }}>
                        {'REMOVE'}
                    </Text>
                </CustomPressable>
            </View>
        );
    };


    return (
        <>
            <Swipeable
                ref={swipeRef}
                renderRightActions={renderRightAction}
                overshootFriction={8}

            >
                <CardContainer />
            </Swipeable>
        </>
    );
};


export default OrdersCartListCard;;