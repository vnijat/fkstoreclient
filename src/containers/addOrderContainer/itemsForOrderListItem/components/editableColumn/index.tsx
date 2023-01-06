import React, { memo, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { InputItem } from "../../../../../components/inputItem/index.windows";
import { getStyle } from "./style";



interface IEditableColumn {
    value: string;
    setValue: (text: string) => void;
    /**
     * Item quantity at Stock for restriction order quantity 
     */
    atStock?: number;
}


const EditableColumn = ({ value, setValue, atStock }: IEditableColumn) => {
    const style = useMemo(() => getStyle(), []);
    const [inputValue, setInputvalue] = useState(value ?? '');
    const handeInputChange = (numberString: string) => {
        if (Number(numberString) <= Number(atStock)) {
            setInputvalue(numberString);
        } else {
            atStock && setInputvalue(Number(atStock).toString());
        }
    };
    useEffect(() => {
        if (Number(value) !== Number(inputValue)) {
            setValue(inputValue);
        }
    }, [inputValue]);

    useEffect(() => {
        if (Number(value) !== Number(inputValue)) {
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
                isNumeric={true}
                maxLength={13}
            />
        </View>
    );
};

export default memo(EditableColumn);