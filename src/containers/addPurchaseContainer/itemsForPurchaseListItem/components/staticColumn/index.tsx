import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { Colors } from "../../../../../utils/colors";
import { getStyle } from "./style";


interface IStaticColumn {
    value: string | number;
    index?: number;
}


const StaticColumn = ({ value, index }: IStaticColumn) => {
    const style = useMemo(() => getStyle(index), [index]);
    return (
        <View style={style.staticColumnContainer}>
            <Text style={style.staticColumnText} selectable>
                {value}
            </Text>
        </View>);
};
export default StaticColumn;