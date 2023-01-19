import React, { FC } from "react";
import { Text, View } from "react-native";
import { columnHeaders } from "../../configs/columnHeaders";
import { getStyle } from "./styles";


interface ListHeaderProps {
}

export const ListHeader: FC<ListHeaderProps> = () => {
    const style = getStyle();

    return (
        <View style={style.container}>
            {columnHeaders.map(({ title, dtoKey, sortable }, i) => {
                return (
                    <View key={i} style={style.columnContainer}>
                        <Text key={`${title}-${i}`} style={style.columnText}>
                            {title.toUpperCase()}
                        </Text>
                    </View>
                );
            })
            }
        </View >
    );
};