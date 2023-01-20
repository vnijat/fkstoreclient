import React from "react";
import { View, ScrollView, FlatList } from "react-native";
import { ItemOptionForInputs } from "../../../types/item";
import { IProjectsForPicker } from "../../../types/project";
import { PurchaseItem } from "../../../types/purchase";
import ItemsForOrderListItem from "../itemsForPurchaseListItem";



interface IItemsForPurchaseList {
    purchaseItems: PurchaseItem[];
    suppliersData: ItemOptionForInputs['supplier'];
}


const ItemsForPurchaseList = ({ purchaseItems, suppliersData }: IItemsForPurchaseList) => {


    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={purchaseItems}
                keyExtractor={(item) => item.itemId.toString()}
                listKey={'purchaseList'}
                renderItem={({ item, index }) => {
                    return <ItemsForOrderListItem purchaseItem={item} index={index} key={`${index}`} suppliersData={suppliersData} />;
                }}
            />
        </View>
    );


};

export default ItemsForPurchaseList;