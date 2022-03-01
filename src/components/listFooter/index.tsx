import React, { FC } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { useAddItemMutation, useDeleteManyItemsMutation } from "../../modules/api/apiSlice";
import { setIsShowAddItemPopUp } from "../../modules/redux/appStateSlicer";
import { clearSelectedItems, setIsEditMode } from "../../modules/redux/ItemsSlicer";
import { RootState, useAppDispatch } from "../../modules/redux/store";
import { areYouSure } from "../../services/alerts";
import { AddItemInterface } from "../../types/addItem";
import { PrimaryButton } from "../primaryButton";
import { getStyle } from "./styles";



interface ListFooterProps {
}

export const ListFooter: FC<ListFooterProps> = ({ }) => {
    const style = getStyle();
    const dispatch = useAppDispatch();
    const isEditMode = useSelector((state: RootState) => state.itemsSlicer.isEditMode);
    const [apiDeleteItems] = useDeleteManyItemsMutation();
    const [apiAdditem, { error }] = useAddItemMutation();
    const selectedItemsID = useSelector((state: RootState) => {
        return state.itemsSlicer.selectedItems.map((item) => item.Id);
    });

    const cancelEdit = () => {
        dispatch(clearSelectedItems());
        dispatch(setIsEditMode(false));
    };


    const onPressAddItem = () => {
        const formdata = new FormData();
        const object: AddItemInterface = {
            name: (Math.random() + 1).toString(36).substring(7),
            quantity: Math.random() * 100,
            purchasePrice: 45655.80,
            pricePerUnit: Math.random() * 100,
            barCodeId: Math.ceil(Math.random() * 2),
            unitId: Math.ceil(Math.random() * 5),
            supplierId: 1,
            categoryId: Math.ceil(Math.random() * 3),
            color: 'white',
            locationId: 1,
            storeId: 1
        };
        formdata.append('item', JSON.stringify(object));
        formdata.append('photo', 'test');

        apiAdditem(formdata);

        // dispatch(setIsShowAddItemPopUp(true));

    };

    const deleteItem = async () => {
        await areYouSure().then((value) => {
            apiDeleteItems({ Ids: selectedItemsID });
            dispatch(clearSelectedItems());
            dispatch(setIsEditMode(false));
        }).catch((error) => { console.log('deleteItem===>> ', error); });
    };



    return (
        <View style={style.container}  >
            <PrimaryButton title={'Add Item'} onPress={onPressAddItem} />
            {isEditMode && <>
                <PrimaryButton title={'Cancel'} onPress={cancelEdit} />
                <PrimaryButton title={'Delete'} onPress={deleteItem} buttonColor={'#E74C3C'} />
            </>
            }
        </View>
    );

};


