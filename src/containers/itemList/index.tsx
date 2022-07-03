import React, { FC, useCallback, useEffect, useState } from "react";
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
    const columnHeaders = [
        'Name',
        'Description',
        'Barcode',
        'Category',
        'Color',
        'Quantity',
        'Unit',
        'Price Per Unit',
        'Total Price'
    ];

    return (
        <>
            <ListHeader columnHeaders={columnHeaders} />
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
                            description,
                            barcode,
                            category,
                            color,
                            quantity,
                            unit,
                            pricePerUnit,
                            totalPrice,
                            id } = item;
                        return (
                            <ItemsContent
                                key={id + index}
                                id={id}
                                itemIndex={index}
                                lastItem={(data?.length ?? 1) - 1}
                                selectBulk={selectBulk}
                                name={name}
                                description={description}
                                barcode={barcode?.code!}
                                category={category?.title!}
                                color={color?.name}
                                quantity={Number(quantity)}
                                unit={unit?.name}
                                // purchasePrice={Number(purchasePrice)}
                                stockPrice={Number(pricePerUnit)}
                                totalPrice={totalPrice}
                            />

                        );
                    }}
                />
            }
        </>
    );
};

export default ItemListTable;