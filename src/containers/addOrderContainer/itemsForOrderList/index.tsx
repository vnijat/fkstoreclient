import React from "react";
import { FlatList, View } from "react-native";
import { OrderItem } from "../../../types/projectOrder";
import ItemsForOrderListItem from "../itemsForOrderListItem";



interface IItemsForOrderList {
    orderItems: OrderItem[];
}


const ItemsForOrderList = ({ orderItems }: IItemsForOrderList) => {


    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={orderItems}
                keyExtractor={(item) => item.itemId.toString()}
                renderItem={({ item, index }) => {
                    return <ItemsForOrderListItem orderItem={item} index={index} key={`${index}`} />;
                }}
            />
        </View>
    );


};

export default ItemsForOrderList;