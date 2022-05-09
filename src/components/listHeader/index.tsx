import React, { FC } from "react";
import { Text, View } from "react-native";
import { Item } from "../../types/ItemsQuery";
import { getStyle } from "./styles";


interface ListHeaderProps {
    items: Item[];
}

export const ListHeader: FC<ListHeaderProps> = ({ items }) => {
    const style = getStyle();
    const columns = ['name', 'barcode', 'category', 'quantity', 'unit', 'price', 'stock price'].map((item) => item.toUpperCase());

    return (
        <View style={style.container}>
            {columns.map((name, i) => {
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