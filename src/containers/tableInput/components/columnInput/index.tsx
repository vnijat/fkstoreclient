import React, { memo, useEffect, useMemo, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Colors } from "../../../../utils/colors";
import { currency } from "../../../../utils/currency";
import { regExPatterns } from "../../../../utils/validation";
import { getStyle } from "./styles";

interface IColumnInput {
    getInputValue: (text: string) => void;
    inputValueFromRowData: string;
    isNumber?: boolean;
    isMoney?: boolean;
}

const ColumnInput = ({ getInputValue, inputValueFromRowData = '', isNumber, isMoney }: IColumnInput) => {
    const style = useMemo(() => getStyle(isMoney), [isMoney]);
    const [inputValue, setInputValue] = useState(inputValueFromRowData);

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
                maxLength={(isNumber || isMoney) ? 13 : 0}
            />
            {isMoney && <Text style={style.currency}>
                {'₼'}
            </Text>}
        </View>
    );


};

export default memo(ColumnInput);