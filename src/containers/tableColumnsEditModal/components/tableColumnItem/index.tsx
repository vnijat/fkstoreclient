import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CheckBox from "@react-native-community/checkbox";
import { Animated, PanResponder, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import CustomPressable from "../../../../components/customPressable";
import { Colors } from "../../../../utils/colors";
import { getStyle } from "./style";
import HELP from "../../../../services/helpers";
import { IListItemLayoutData } from "../../types";





interface ITableColumnsEditItem {
    onCheckBoxValueChanged: (value: boolean) => void;
    chekBoxValue: boolean;
    title: string;
    index: number;
    setListItemsData: (index: number, data: any) => void;
    listItemsData: IListItemLayoutData[];
    swipeItems: (currentIndex: number, newIndex: number) => void;
}

const TableColumnEditItem = ({ onCheckBoxValueChanged, title, swipeItems, setListItemsData, listItemsData, chekBoxValue, index }: ITableColumnsEditItem) => {
    const style = useMemo(() => getStyle(), []);
    const pan = useRef(new Animated.ValueXY()).current;
    const [isResponder, setIsResponder] = useState(false);


    const isInBoindary = (movedItem: { moveX: number; moveY: number; width: number; height: number; }, currentItem: { width: number, height: number; locationX: number, locationY: number; }) => {
        const currentItemBoinderyX = currentItem.width + currentItem.locationX;
        const currentItemBoindaryY = currentItem.locationY + currentItem.height;
        return (movedItem.moveX < currentItemBoinderyX && movedItem.moveX > currentItem.locationX) && (movedItem.moveY < currentItemBoindaryY && movedItem.moveY > currentItem.locationY);
    };

    const getIndex = (moveX: number, moveY: number) => {
        const movedItem = listItemsData.find((item) => item.index === index);
        const item = listItemsData.find((item) => {
            if (item.index !== movedItem?.index) {
                return isInBoindary({ moveX: Math.floor(moveX), moveY: Math.floor(moveY), width: movedItem?.width!, height: movedItem?.height! }, { width: item.width, height: item.height, locationX: Math.floor(item.locationX), locationY: Math.floor(item.locationY) });
            }
        });
        return item;
    };

    const onResponderRelease = (evt: any, gestureState: any) => {
        setIsResponder(false);
        const { moveX, moveY } = gestureState;
        const aboveItem = getIndex(moveX, moveY);
        if (aboveItem) {
            swipeItems(index, aboveItem.index);
        }
        Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false
        }).start();
    };

    const panResponder =
        PanResponder.create(
            {
                onStartShouldSetPanResponder: () => true,
                onMoveShouldSetPanResponder: () => true,
                onPanResponderTerminate: () => false,
                onStartShouldSetPanResponderCapture: (evt, gestureState) =>
                    true,
                onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
                    true,
                onPanResponderMove: Animated.event([
                    null,
                    { dx: pan.x, dy: pan.y, }
                ], { useNativeDriver: false, }
                ),
                onPanResponderRelease: onResponderRelease,
                onPanResponderGrant: (evt, gestureState) => {
                    setIsResponder(true);
                },
            }
        );


    const onlayout = (event: any) => {
        const { layout: { x, y, height, width } } = event.nativeEvent;
        setListItemsData(index, { index, locationX: x, locationY: y, height, width });
    };

    return (
        <Animated.View
            onLayout={onlayout}
            style={[{ transform: [{ translateX: pan.x }, { translateY: pan.y }], backgroundColor: Colors.CARD_COLOR }, isResponder && { zIndex: 2 }]}
            {...panResponder.panHandlers}
        >
            <View style={style.container}>
                <View style={style.checkBoxContainer}>
                    <CheckBox
                        value={chekBoxValue}
                        onCheckColor={Colors.CARD_COLOR}
                        onFillColor={Colors.METALLIC_GOLD}
                        tintColor={Colors.CARD_HEADER_COLOR}
                        onTintColor={Colors.METALLIC_GOLD}
                        onValueChange={onCheckBoxValueChanged}
                    />
                </View>
                <View style={style.titleAndButtonContainer}>
                    <Text style={style.titleText}>
                        {title}
                    </Text>
                    <View style={style.buttonContainer}>
                        <Icon name={'select-arrows'} color={Colors.DEFAULT_TEXT_COLOR} size={16} />
                    </View>
                </View>
            </View >
        </Animated.View>
    );
};


export default TableColumnEditItem;