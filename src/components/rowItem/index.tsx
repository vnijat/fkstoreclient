import React, { FC } from "react";
import { View } from "react-native";
import { getStyle } from "./styles";

interface IRowItem {
    color?: string;
    width?: number;
    height?: number;
}


const RowItem: FC<IRowItem> = ({ color, width, height }) => {
    const style = getStyle(color, width, height);

    return (
        <View style={style.row} />
    );

};

export default RowItem;