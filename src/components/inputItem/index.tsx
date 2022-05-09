import { Picker } from "@react-native-picker/picker";
import React, { FC, memo, useMemo } from "react";
import { View, TextInput, Text } from "react-native";
import { regExPatterns } from "../../utils/validation";
import { getStyle } from "./styles";

interface IInputItem {
    inputTitle?: string;
    isNumeric?: boolean;
    placeHolder?: string;
    width: number;
    height: number;
    maxLength?: number;
    isMultiLine?: boolean;
    inputRef?: (r: any) => {};
    setValue: (text: string) => void;
    inputValue: string;
    id?: number;
    selectable?: boolean;
    selectableData?: { label: string; id: number; }[];
    isErorr?: boolean;
    titleColor?: string;
}


export const InputItem: FC<IInputItem> = memo(({ inputTitle, isNumeric, placeHolder, width, height, maxLength, isMultiLine, inputRef, setValue, inputValue, id, selectable, selectableData, isErorr, titleColor }) => {
    const style = useMemo(() => getStyle(height, width, isErorr, titleColor,), [isErorr, titleColor, height, width]);

    const onChangeText = (text: string) => {
        const isNum = regExPatterns.IS_NUMERIC;
        if (isNumeric) {
            (isNum.test(text) || text === '') && setValue(text);
        } else {
            setValue(text);
        }
    };

    const onValueChange = (itemValue: string) => {
        setValue(itemValue.toString());
    };

    const renderPickerItem = useMemo(() => {
        if (selectableData?.length) {
            return selectableData?.map(({ label, id }) => {
                return <Picker.Item label={label} value={id} key={id} />;
            });
        } else {
            return <Picker.Item label={'no data'} value={0} />;
        }
    }, [selectableData]);

    return (
        <View>
            <Text style={style.inputTitle}>{`${inputTitle?.toUpperCase()} ${isErorr ? '*' : ''} `}
            </Text>
            {selectable ?
                <Picker
                    key={id}
                    style={style.picker}
                    selectedValue={inputValue}
                    onValueChange={onValueChange}
                    itemStyle={style.pickerItem}
                >
                    {renderPickerItem}
                </Picker>
                :
                <TextInput
                    key={id}
                    style={style.textInput}
                    ref={(r) => inputRef && inputRef(r)}
                    onChangeText={onChangeText}
                    value={inputValue}
                    placeholder={placeHolder}
                    multiline={isMultiLine}
                    maxLength={maxLength}
                />
            }
        </View>
    );

});