import React, { memo, useMemo } from "react";
import { Text, View } from "react-native";
import { getStyle } from "./style";

interface IDataField {
    title: string;
    value: string | number;
    height?: number | string;
    width?: number | string;
    backgroundColor?: string;
    fieldTitle?: string;

}

const DataField = ({ value, title, height, backgroundColor, width, fieldTitle }: IDataField) => {
    const style = useMemo(() => getStyle(height, backgroundColor, width), [height, backgroundColor, width]);


    return (
        <View style={style.container}>
            <View style={style.titleContainer}>
                <Text style={style.titleText} selectable>
                    {title}
                </Text>
            </View>
            <View style={style.valueContainer}>
                <Text style={style.valueText} selectable>
                    {value}
                </Text>
            </View>
        </View>
    );
};

export default memo(DataField);