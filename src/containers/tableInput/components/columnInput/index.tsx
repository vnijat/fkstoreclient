import React, { memo, useEffect, useMemo, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Colors } from "../../../../utils/colors";
import { currency } from "../../../../utils/currency.windows";
import { regExPatterns } from "../../../../utils/validation";
import { getStyle } from "./styles";

interface IColumnInput {
    getInputValue: (text: string) => void;
    inputValueFromRowData: string;
    isNumber?: boolean;
    isMoney?: boolean;
    isEditable?: boolean;
    isDate?: boolean;
}

const ColumnInput = ({ getInputValue, inputValueFromRowData = '', isNumber, isMoney, isEditable, isDate }: IColumnInput) => {
    const style = useMemo(() => getStyle(isMoney), [isMoney]);
    const [inputValue, setInputValue] = useState(isDate ? new Date(inputValueFromRowData).toLocaleDateString() : inputValueFromRowData);

    const onChangeText = (text: string) => {
        const isNum = regExPatterns.IS_NUMERIC;
        if (isNumber || isMoney) {
            if (isNum.test(text) || text === '') {
                setInputValue(text);
                getInputValue(Number(+text).toFixed(3));
            }
        } else {
            setInputValue(text);
            getInputValue(text);
        }
    };
    return (
        <View style={style.inputContainer}>
            <TextInput
                style={style.textinput}
                value={inputValue}
                onChangeText={onChangeText}
                defaultValue={inputValueFromRowData}
                editable={!!isEditable}
                scrollEnabled={false}
                maxLength={(isNumber || isMoney) ? 13 : 0}
            />
            {isMoney && <Text style={style.currency}>
                {'₼'}
            </Text>}
        </View>
    );


};

export default memo(ColumnInput);