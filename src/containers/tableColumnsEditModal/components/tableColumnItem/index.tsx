import React, { useMemo } from "react";
import CheckBox from "@react-native-community/checkbox";
import { Text, View } from "react-native";
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
}

const TableColumnEditItem = ({ onCheckBoxValueChanged, title, chekBoxValue, cantMoveUp, cantMoveDown, onMoveUp, onMoveDown }: ITableColumnsEditItem) => {
    const style = useMemo(() => getStyle(), []);

    const onPressUP = () => {
        onMoveUp();
    };

    const onPressDown = () => {
        onMoveDown();
    };

    return (
        <View
            style={style.container}
        >
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
        </View>
    );
};


export default TableColumnEditItem;