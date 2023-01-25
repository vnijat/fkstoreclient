import React, { useCallback } from "react";
import { View, FlatList } from "react-native";
import { ItemOptionForInputs } from "../../../types/item";
import { PurchaseItem } from "../../../types/purchase";
import ItemsForPurchaseListItem from "../itemsForPurchaseListItem";



interface IItemsForPurchaseList {
    purchaseItems: PurchaseItem[];
    suppliersData: ItemOptionForInputs['supplier'];
}


const ItemsForPurchaseList = ({ purchaseItems, suppliersData }: IItemsForPurchaseList) => {


    const listItem = useCallback(({ item, index }: { item: PurchaseItem; index: number; }) => {
        return <ItemsForPurchaseListItem
            purchaseItem={item}
            index={index}
            key={`${index}`}
            suppliersData={suppliersData} />;
    }, []);


    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={purchaseItems}
                keyExtractor={(item) => item.itemId.toString()}
                listKey={'purchaseList'}
                renderItem={listItem}
            />
        </View>
    );


};

export default ItemsForPurchaseList;