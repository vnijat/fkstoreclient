import { Picker } from "@react-native-picker/picker";
import React, { FC, memo, useMemo } from "react";
import { View, TextInput, Text } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
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
    isSearch?: boolean;
    backgroundColor?: string;
}


export const InputItem: FC<IInputItem> = memo(({ inputTitle, isNumeric, placeHolder, width, height, maxLength, isMultiLine, inputRef, setValue, inputValue, id, selectable, selectableData, isErorr, titleColor, isSearch, backgroundColor }) => {
    const style = useMemo(() => getStyle(height, width, isErorr, titleColor, backgroundColor), [isErorr, titleColor, height, width, backgroundColor]);

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
            {!!inputTitle && < Text style={style.inputTitle}>{`${inputTitle?.toUpperCase()} ${isErorr ? '*' : ''} `}</Text>}
            {
                selectable ?
                    <Picker
                        key={id}
                        style={style.picker
                        }
                        selectedValue={inputValue}
                        onValueChange={onValueChange}
                        itemStyle={style.pickerItem}
                    >
                        {renderPickerItem}
                    </Picker >
                    :
                    <>
                        <TextInput
                            key={id}
                            style={style.textInput}
                            ref={(r) => inputRef && inputRef(r)}
                            onChangeText={onChangeText}
                            value={inputValue}
                            placeholder={placeHolder}
                            multiline={isMultiLine}
                            maxLength={maxLength}
                            onFocus={() => console.log("Focused")}
                            onBlur={() => console.log("Blurred")}
                        />
                        {/* <View style={{ position: 'absolute', top: 15, left: 5 }}>
                            <Icon name="magnifying-glass" size={16} color={'white'} />
                        </View> */}
                    </>
            }
        </View >
    );

});