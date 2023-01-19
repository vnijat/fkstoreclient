import React from "react";
import { View, ScrollView, FlatList } from "react-native";
import { IProjectsForPicker } from "../../../types/project";
import { OrderItem } from "../../../types/projectOrder";
import ItemsForOrderListItem from "../itemsForOrderListItem";



interface IItemsForOrderList {
    orderItems: OrderItem[];
    projectsData: IProjectsForPicker[];
}


const ItemsForOrderList = ({ orderItems, projectsData }: IItemsForOrderList) => {


    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={orderItems}
                keyExtractor={(item) => item.itemId.toString()}
                listKey={'orderList'}
                renderItem={({ item, index }) => {
                    return <ItemsForOrderListItem orderItem={item} index={index} key={`${index}`} projectsData={projectsData ?? []} />;
                }}
            />
        </View>
    );


};

export default ItemsForOrderList;