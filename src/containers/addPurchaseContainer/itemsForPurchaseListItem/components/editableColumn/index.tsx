import React, { memo, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { InputItem } from "../../../../../components/inputItem/index.windows";
import HELP from "../../../../../services/helpers";
import { getStyle } from "./style";



interface IEditableColumn {
    value: string;
    setValue: (text: string | boolean) => void;
    /**
     * Item quantity at Stock for restriction order quantity 
     */
    atStock?: number;
    isCheckBox?: boolean;
    isNumeric?: boolean;
    disabled?: boolean;
}


const EditableColumn = ({ value, setValue, atStock, isCheckBox, isNumeric, disabled }: IEditableColumn) => {
    const style = useMemo(() => getStyle(), []);
    const [inputValue, setInputvalue] = useState<string | boolean>(value);

    const handeInputChange = (value: string | boolean) => {
        if (isNumeric) {
            setInputvalue(value);
        } else {
            setInputvalue(value);
        }
    };
    useEffect(() => {
        console.log("isNotSameValue===>>>", HELP.isNotSameValue(value, inputValue));
        if (HELP.isNotSameValue(value, inputValue)) {
            setValue(inputValue);
        }
    }, [inputValue]);

    useEffect(() => {
        if (HELP.isNotSameValue(value, inputValue)) {
            setInputvalue(value);
        }
    }, [value]);

    return (
        <View style={style.editableColumnContainer}>
            <InputItem
                setValue={handeInputChange}
                inputValue={inputValue}
                height={30}
                width={100}
                isNumeric={isNumeric}
                maxLength={30}
                isCheckBox={isCheckBox}
                disabledForEdit={disabled}
            />
        </View>
    );
};

export default memo(EditableColumn);