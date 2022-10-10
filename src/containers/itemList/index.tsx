import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Alert, Animated, Easing, FlatList, Text, View } from "react-native";
import { Flyout } from "react-native-windows";
import { useSelector } from "react-redux";
import { ListHeader } from "./components/listHeader";
import { PrimaryButton } from "../../components/primaryButton";
import RowItem from "../../components/rowItem";
import { useDeleteManyItemsMutation } from "../../modules/api/apiSlice";
import { addItemId, clearSelectedItems, setIsEditMode, setIsItemForEdit, setItemForPost } from "../../modules/redux/itemsSlicer";
import { setItemQueryParams } from "../../modules/redux/itemQuerySlicer";
import { selectIsEditMode } from "../../modules/redux/selectors/itemSelectors";
import { RootState, useAppDispatch } from "../../modules/redux/store";
import { getSelectedTotalPrice, selectMany } from "../../services/ItemServices";
import { Item } from "../../types/ItemsQuery";
import { Colors } from "../../utils/colors";
import { currency } from "../../utils/currency";
import ItemsContent from "../itemsContent";
import { getStyle } from "./style";


interface IItemListTable {
    data: Item[];
    isLoading: boolean;
}



const ItemListTable: FC<IItemListTable> = ({ data, isLoading }) => {
    const style = getStyle();
    const dispatch = useAppDispatch();
    const isEditMode = useSelector(selectIsEditMode);
    const [apiDeleteItems] = useDeleteManyItemsMutation();
    const navigation = useNavigation<StackNavigationProp<any>>();
    const { selectedItemsID, selectedTotalPrice, selectedCount } = useSelector((state: RootState) => {
        return {
            selectedItemsID: state.itemsSlicer.selectedItems.map((item) => item.Id),
            selectedTotalPrice: state.itemsSlicer.selectedItems.reduce((prev, current) => +current.totalPrice + prev, 0),
            selectedCount: state.itemsSlicer.selectedItems.length
        };
    });
    const selectBulk = useCallback((from: number, to: number) => selectMany(from, to, data!, dispatch, addItemId), [data]);
  

    const cancelEdit = () => {
        dispatch(clearSelectedItems());
        dispatch(setIsEditMode(false));
    };

    const aproveDeletion = () => {
        apiDeleteItems({ Ids: selectedItemsID });
        dispatch(clearSelectedItems());
        dispatch(setIsEditMode(false));
        dispatch(setItemQueryParams({ page: 1, search: '' }));
    };

    const cancelDeletion = () => { };

    const deleteItem = () => Alert.alert('do you want to delete Items?', 'you cant recover deletet Items!', [
        { onPress: cancelDeletion },
        { text: 'Cancel', onPress: cancelDeletion, style: 'cancel' },
        { text: 'Yes', onPress: aproveDeletion, style: 'destructive' }
    ]);


    const modifySelectedForEdit = () => {
        const itemForPost: any = {};
        const selectedItem: Item = data.filter(item => item.id === selectedItemsID[0])[0];
        dispatch(setIsItemForEdit(true));
        for (let key in selectedItem) {
            const objectValue = selectedItem[key as keyof Item];
            const isObject = objectValue && typeof objectValue === 'object';
            if (isObject) {
                itemForPost[`${key}Id`] = objectValue.id.toString();
            } else {
                itemForPost[key] = isNaN(Number(objectValue)) ? objectValue : Number(objectValue).toString();
            }
        }
        return itemForPost;
    };


    const onPressEdit = () => {
        const itemForPost = modifySelectedForEdit();
        dispatch(setItemForPost(itemForPost));
        cancelEdit();
        navigation.navigate('AddItem');
    };


    const renderSelectedInfo = useMemo(() => {
        if (isEditMode) {
            return (
                <View style={style.infoContainer}>
                    <Text style={style.infoText}>
                        <Text style={style.infoTitle}>Selected:</Text> <Text style={style.infoValue} >{selectedCount} </Text>
                        <Text style={style.infoTitle}>Total Price:</Text> <Text style={style.infoValue}>{currency.format(selectedTotalPrice)} </Text>
                    </Text>
                    <View style={{ flexDirection: 'row', width: 180, height: 30, marginRight: 10, justifyContent: 'space-between' }}>
                        {selectedCount === 1 && < PrimaryButton title={'Edit'} onHoverOpacity onPress={onPressEdit} buttonColor={Colors.CARD_COLOR} borderRadius={2} textColor={Colors.DEFAULT_TEXT_COLOR} />}
                        < PrimaryButton title={`Delete (${selectedCount})`} onPress={deleteItem} onHoverOpacity buttonColor={Colors.METALLIC_GOLD} borderRadius={2} />
                        < PrimaryButton title={'Cancel'} onPress={cancelEdit} onHoverOpacity buttonColor={Colors.CARD_COLOR} borderRadius={2} textColor={Colors.DEFAULT_TEXT_COLOR} />
                    </View>
                </View>
            );
        } else {
            return null;
        }

    }, [isEditMode, selectedCount, selectedTotalPrice]);

    return (
        <View style={{ flex: 1 }}>
            {renderSelectedInfo}
            <View style={{ backgroundColor: Colors.CARD_HEADER_COLOR, justifyContent: 'center' }}>
                <ListHeader />
            </View>
            <View>
            </View>
            {isLoading ?
                <View style={{ paddingTop: 100 }}>
                    <ActivityIndicator color={Colors.OLD_GOLD} />
                </View>
                : <FlatList
                    style={{ flex: 1, backgroundColor: Colors.BACKGROUND_COLOR, margin: 5 }}
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => {
                        const {
                            name,
                            description,
                            barcode,
                            category,
                            color,
                            unit,
                            quantity,
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
        </View>
    );
};

export default ItemListTable;