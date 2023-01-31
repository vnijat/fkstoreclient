import React, { useCallback } from "react";
import { View, ScrollView, FlatList } from "react-native";
import { IProjectsForPicker } from "../../../types/project";
import { OrderItem } from "../../../types/projectOrder";
import ItemsForOrderListItem from "../itemsForOrderListItem";



interface IItemsForOrderList {
    orderItems: OrderItem[];
    projectsData: IProjectsForPicker[];
}


const ItemsForOrderList = ({ orderItems, projectsData }: IItemsForOrderList) => {


    const listItem = useCallback(({ item, index }: { item: OrderItem, index: number; }) => {
        return <ItemsForOrderListItem
            orderItem={item}
            index={index}
            key={`${index}`}
            projectsData={projectsData ?? []} />;
    }, []);



    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={orderItems}
                keyExtractor={(item) => item.itemId.toString()}
                listKey={'orderList'}
                renderItem={listItem}
            />
        </View>
    );


};

export default ItemsForOrderList;