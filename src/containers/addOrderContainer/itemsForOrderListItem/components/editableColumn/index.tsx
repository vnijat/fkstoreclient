import React, { memo, useState } from "react";
import { View } from "react-native";
import { InputItem } from "../../../../../components/inputItem/index.windows";



interface IEditableColumn {
    value: string | number;
    setValue: (text: string) => void;
    /**
     * Item quantity at Stock for restriction order quantity 
     */
    atStock?: number;
}


const EditableColumn = ({ value, setValue, atStock }: IEditableColumn) => {
    const maxLength = `${Number(atStock)}`.length;
    const handeInputChange = (numberString: string) => {
        if (Number(numberString) <= Number(atStock)) {
            setValue(numberString);
        } else {
            atStock && setValue(Number(atStock).toString());
        }
    };
    return (
        <View style={{ alignItems: 'flex-start', width: 120 }}>
            <InputItem
                setValue={(numberString) => handeInputChange(numberString as string)}
                inputValue={value.toString()}
                height={30}
                width={100}
                isNumeric={true}
                maxLength={maxLength}
            />
        </View>
    );
};

export default memo(EditableColumn);