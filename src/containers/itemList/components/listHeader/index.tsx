import React, { FC } from "react";
import { Text, View } from "react-native";
import { Item } from "../../../../types/ItemsQuery";
import { getStyle } from "./styles";


interface ListHeaderProps {
    columnHeaders: string[];
}

export const ListHeader: FC<ListHeaderProps> = ({ columnHeaders }) => {
    const style = getStyle();

    return (
        <View style={style.container}>
            {columnHeaders.map((name, i) => {
                return (
                    <View key={i} style={style.columnContainer}>
                        <Text key={`${name}-${i}`} style={style.columnText}>
                            {name}
                        </Text>
                    </View>
                );
            })
            }
        </View >
    );
};