import React, { memo } from "react";
import { Text, View } from "react-native";
import { Colors } from "../../../../utils/colors";

interface IDataField {
    title: string;
    value: string | number;
    height?: number | string;
    width?: number | string;
    backgroundColor?: string;
    fieldTitle?: string;

}

const DataField = ({ value, title, height, backgroundColor, width, fieldTitle }: IDataField) => {



    return (
        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
            <View style={{ marginBottom: 2 }}>
                <Text style={{ color: Colors.DEFAULT_TEXT_COLOR }} selectable>
                    {title}
                </Text>
            </View>
            <View style={{ backgroundColor: backgroundColor || Colors.CARD_HEADER_COLOR, width: width || '100%', height: height || 30, borderRadius: 3, flexWrap: 'wrap' }}>
                <Text style={{ color: Colors.DEFAULT_TEXT_COLOR, fontSize: 14, padding: 5 }} selectable>
                    {value}
                </Text>
            </View>
        </View>
    );
};

export default memo(DataField);