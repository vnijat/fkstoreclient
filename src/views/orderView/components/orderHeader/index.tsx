import React, { memo, useMemo } from "react";
import { Text, View } from "react-native";
import { OrdersColumnTitle } from "./config";
import { getStyle } from "./styles";


interface IOrderListHeader {
}



const OrderListHeader = ({ }: IOrderListHeader) => {
    const style = useMemo(() => getStyle(), []);


    return (
        <View style={style.container}>
            {OrdersColumnTitle.map(({ title, dtoKey, sortable }, i) => {
                return (
                    <View key={i} style={style.columnContainer}>
                        <Text key={`${title}-${i}`} style={style.columnText}>
                            {title.toUpperCase()}
                        </Text>
                    </View>
                );
            })
            }
        </View>
    );
};

export default memo(OrderListHeader);