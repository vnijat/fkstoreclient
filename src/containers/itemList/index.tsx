import React, { FC, useCallback } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { ListHeader } from "../../components/listHeader";
import RowItem from "../../components/rowItem";
import { addItemId } from "../../modules/redux/ItemsSlicer";
import { useAppDispatch } from "../../modules/redux/store";
import { selectMany } from "../../services/ItemServices";
import { Data, Item } from "../../types/ItemsQuery";
import ItemsContent from "../itemsContent";


interface IItemListTable {
    data: Item[];
    isLoading: boolean;
}



const ItemListTable: FC<IItemListTable> = ({ data, isLoading }) => {
    const dispatch = useAppDispatch();


    const selectBulk = useCallback((from: number, to: number) => selectMany(from, to, data!, dispatch, addItemId), [data]);

    return (
        <>
            <ListHeader />
            <RowItem height={10} />
            {isLoading ?
                <View style={{ paddingTop: 100 }}>
                    <ActivityIndicator color={Colors.OLD_GOLD} />
                </View>
                : <FlatList
                    style={{ flex: 1, backgroundColor: Colors.ALABASTER, margin: 5 }}
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => {
                        const {
                            name,
                            barcode,
                            category,
                            quantity,
                            purchasePrice,
                            unit,
                            id,
                            pricePerUnit,
                            description,
                            supplier,
                            store } = item;
                        return (
                            <ItemsContent
                                key={id + index}
                                id={id}
                                name={name}
                                barcode={barcode?.code!}
                                category={category?.title!}
                                quantity={Number(quantity)}
                                stockPrice={Number(pricePerUnit)}
                                purchasePrice={Number(purchasePrice)}
                                unit={unit.name}
                                itemIndex={index}
                                lastItem={(data?.length ?? 1) - 1}
                                selectBulk={selectBulk}
                            />

                        );
                    }}
                />
            }
        </>
    );
};

export default ItemListTable;