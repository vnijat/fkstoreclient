import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { Colors } from "../../../../../utils/colors";
import { getStyle } from "./style";


interface IStaticColumn {
    value: string | number;
    index?: number;
}


const StaticColumn = ({ value, index }: IStaticColumn) => {
    const columnWidth = index == 0 ? 50 : 120;
    const style = useMemo(() => getStyle(columnWidth), [columnWidth]);
    return (
        <View style={style.staticColumnContainer}>
            <Text style={style.staticColumnText}>
                {value}
            </Text>
        </View>);
};
export default StaticColumn;