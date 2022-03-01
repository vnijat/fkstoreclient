import React, { FC, useMemo } from "react";
import { Text, View } from "react-native";
import { useGetAllItemsQuery } from "../../modules/api/apiSlice";
import { getStyle } from "./styles";

interface InventoryInfoProps {
    itemsCount: number;
}

export const InventoryInfo: FC<InventoryInfoProps> = ({ itemsCount }) => {
    const style = getStyle();


    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: 'center', }}>
                <Text style={{ color: '#4DB6AC', fontSize: 30, fontWeight: '700' }}>{itemsCount}</Text>
                <Text style={{ color: '#4DB6AC', fontSize: 10 }}>
                    {"Items in Stock"}
                </Text>
            </View>
        </View>
    );
};