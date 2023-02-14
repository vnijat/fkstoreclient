import React, { FC, memo, useCallback, useMemo } from "react";
import { ActivityIndicator, Alert, FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { PrimaryButton } from "../../../../components/primaryButton";
import { useDeleteManyItemsMutation } from "../../../../modules/api/apiSlice";
import { setItemQueryParams } from "../../../../modules/redux/itemQuerySlicer";
import { addItemId, clearSelectedItems, setIsEditMode, setIsItemForEdit, setItemForPost, setIsShowAddEditModal } from "../../../../modules/redux/itemsSlicer";
import { selectIsEditMode } from "../../../../modules/redux/selectors/itemSelectors";
import { RootState, useAppDispatch } from "../../../../modules/redux/store";
import HELP from "../../../../services/helpers";
import { selectMany } from "../../../../services/ItemServices";
import { Item } from "../../../../types/ItemsQuery";
import { Colors } from "../../../../utils/colors";
import { currency } from "../../../../utils/currency.windows";
import ItemsContent from "../itemsContent";
import { ListHeader } from "./components/listHeader";
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
    const { selectedItemsID, selectedTotalPrice, selectedCount } = useSelector((state: RootState) => {
        return {
            selectedItemsID: state.itemsSlicer.selectedItems.map((item) => item.Id),
            selectedTotalPrice: state.itemsSlicer.selectedItems.reduce((prev, current) => +current.totalPrice + prev, 0),
            selectedCount: state.itemsSlicer.selectedItems.length
        };
    });
    const selectBulk = useCallback((from: number, to: number) => selectMany(from, to, data!, dispatch, addItemId), [data]);

    const cancelEdit = useCallback(() => {
        dispatch(clearSelectedItems());
        dispatch(setIsEditMode(false));
    }, []);

    const aproveDeletion = useCallback(async () => {
        try {
            const response = await apiDeleteItems(selectedItemsID);
            if (response.error) {
                throw response.error;
            }
            dispatch(clearSelectedItems());
            dispatch(setIsEditMode(false));
            dispatch(setItemQueryParams({ page: 1, search: '' }));
        } catch (error) {
            if (error?.data?.message) {
                HELP.alertError(error);
            }
        }

    }, [selectedItemsID.length]);


    const deleteItem = useCallback(async () => {
        try {
            await HELP.alertPromise('do you want to delete Items?', 'you cant recover deletet Items!');
            await aproveDeletion();
        } catch (erorr) {
            console.log("deleteItem=>", erorr);
        }
    }, [selectedItemsID.length]);

    const onPressEdit = useCallback(() => {
        const itemForPost = HELP.modifyItemForEdit(data, selectedItemsID[0]);
        dispatch(setIsItemForEdit(true));
        dispatch(setItemForPost(itemForPost));
        dispatch(setIsShowAddEditModal(true));
        cancelEdit();
    }, [data, selectedItemsID.length]);


    const renderSelectedInfo = useMemo(() => {
        if (isEditMode) {
            return (
                <View style={style.infoContainer}>
                    <Text style={style.infoText}>
                        <Text style={style.infoTitle}>Selected:</Text> <Text style={style.infoValue} >{selectedCount} </Text>
                        <Text style={style.infoTitle}>Total Price:</Text> <Text style={style.infoValue}>{currency.format(selectedTotalPrice)} </Text>
                    </Text>
                    <View style={style.infoActionButtonContainer}>
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
        <View style={style.container}>
            {renderSelectedInfo}
            <View style={style.listHeaderContainer}>
                <ListHeader />
            </View>
            <View>
            </View>
            {isLoading ?
                <View style={style.activityContainer}>
                    <ActivityIndicator color={Colors.OLD_GOLD} />
                </View>
                : <FlatList
                    style={style.listContainer}
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <ItemsContent
                                data={item}
                                key={item.id + index}
                                id={item.id}
                                itemIndex={index}
                                selectBulk={selectBulk}
                            />
                        );
                    }}
                />
            }
        </View>
    );
};

export default memo(ItemListTable);