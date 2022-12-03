import React, { memo, useMemo } from "react";
import { Text, View } from "react-native";
import { getStyle } from "./styles";

interface IHeaderColumn {
    title: string;
}

const HeaderColumn = ({ title }: IHeaderColumn) => {
    const style = useMemo(() => getStyle(), []);
    return (
        <View style={style.columnContaier}>
            <Text style={style.columnText} >
                {title}
            </Text>
        </View>

    );
};
export default memo(HeaderColumn);