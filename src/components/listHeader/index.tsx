import React, { FC } from "react";
import { Text, View } from "react-native";
import { Item } from "../../types/ItemsQuery";
import { getStyle } from "./styles";


interface ListHeaderProps {
    items: Item[];
}

export const ListHeader: FC<ListHeaderProps> = ({ items }) => {
    const style = getStyle();
    const columns = ['#', 'name', 'barcode', 'category', 'quantity', 'unit', 'price', 'stock price'];

    return (
        <View style={{ height: 30, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#4DB6AC' }}>
            {columns.map((name, i) => {
                return (
                    <View key={i} style={[{ justifyContent: 'center', alignItems: 'center', flex: 1, flexGrow: '1' }, i === 0 && { flexGrow: '0.2' }]}>
                        <Text key={`${name}-${i}`} style={[{ color: '#FFF', fontWeight: '700', fontSize: 14 }, i === 0 && { fontSize: 12 }]}>
                            {name}
                        </Text>
                    </View>
                );
            })
            }
        </View >
    );
};