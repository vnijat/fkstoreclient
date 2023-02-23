import React, { useMemo, useRef } from "react";
import CheckBox from "@react-native-community/checkbox";
import { Animated, PanResponder, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import CustomPressable from "../../../../components/customPressable";
import { Colors } from "../../../../utils/colors";
import { getStyle } from "./style";
import HELP from "../../../../services/helpers";





interface ITableColumnsEditItem {
    onCheckBoxValueChanged: (value: boolean) => void;
    chekBoxValue: boolean;
    onMoveUp: () => void;
    onMoveDown: () => void;
    cantMoveUp: boolean;
    cantMoveDown: boolean;
    title: string;
    index: number;
    itemRef: any;
}

const TableColumnEditItem = ({ onCheckBoxValueChanged, title, itemRef, chekBoxValue, index, cantMoveUp, cantMoveDown, onMoveUp, onMoveDown }: ITableColumnsEditItem) => {
    const style = useMemo(() => getStyle(), []);
    const pan = useRef(new Animated.ValueXY()).current;

    const onPressUP = () => {
        onMoveUp();
    };

    const onPressDown = () => {
        onMoveDown();
    };


    const panResponder = useRef(
        PanResponder.create(
            {
                onStartShouldSetPanResponder: () => true,
                onMoveShouldSetPanResponder: () => true,
                onStartShouldSetPanResponderCapture: (evt, gestureState) =>
                    true,
                onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
                    true,
                onPanResponderMove: Animated.event([
                    null,
                    { dx: pan.x, dy: pan.y, }
                ],
                    {
                        useNativeDriver: false
                    }
                ),
                onPanResponderRelease: (evt, gestureState) => {
                    const { moveX, moveY, y0, x0 } = gestureState;
                    console.log("ONRELEASE======>>>>>", { moveX, moveY, y0, x0 });
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false
                    }).start();
                },
                onPanResponderGrant: (evt, gestureState) => {
                    const { moveX, moveY, y0, x0 } = gestureState;
                    console.log('ONGRANT==============>>>', { moveX, moveY, y0, x0 });
                }
            }
        )
    ).current;


    return (
        <Animated.View
            ref={(r) => itemRef[index] = r}
            style={{ transform: [{ translateX: pan.x }, { translateY: pan.y }], backgroundColor: Colors.CARD_COLOR }}
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
                        <CustomPressable
                            onHoverOpacity={!cantMoveUp}
                            disabled={cantMoveUp}
                            onPress={onPressUP}
                        >
                            <Icon name={'chevron-small-up'} color={Colors.DEFAULT_TEXT_COLOR} size={22} style={{ opacity: cantMoveUp ? 0.5 : 1 }} />
                        </CustomPressable>
                        <CustomPressable
                            onHoverOpacity={!cantMoveDown}
                            disabled={cantMoveDown}
                            onPress={onPressDown}
                        >
                            <Icon name={'chevron-small-down'} color={Colors.DEFAULT_TEXT_COLOR} size={22} style={{ opacity: cantMoveDown ? 0.5 : 1 }} />
                        </CustomPressable>
                    </View>
                </View>
            </View >
        </Animated.View>
    );
};


export default TableColumnEditItem;