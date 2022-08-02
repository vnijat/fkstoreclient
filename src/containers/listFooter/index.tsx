import React, { FC, useEffect, useMemo, useState } from "react";
import { View, Alert } from "react-native";
import { useSelector } from "react-redux";
import { AlertModal } from "../../components/alertModal";
import { PagePagination } from "../../components/pagePagination";
import { PrimaryButton } from "../../components/primaryButton";
import { useAddItemMutation, useDeleteManyItemsMutation } from "../../modules/api/apiSlice";
import { clearSelectedItems, setIsEditMode } from "../../modules/redux/ItemsSlicer";
import { setQueryParams } from "../../modules/redux/querySlicer";
import { RootState, useAppDispatch } from "../../modules/redux/store";
import { Imeta } from "../../types/ItemsQuery";
import { getStyle } from "./styles";



interface ListFooterProps {
    meta?: Imeta;
    totalItems: number;
}


const ListFooter: FC<ListFooterProps> = ({ meta, totalItems }) => {
    const style = getStyle();
    const dispatch = useAppDispatch();
    const isEditMode = useSelector((state: RootState) => state.itemsSlicer.isEditMode);
    const [apiDeleteItems] = useDeleteManyItemsMutation();
    const [apiAdditem, { error }] = useAddItemMutation();
    const [isShowAlert, setIsShowAlert] = useState(false);
    const selectedItemsID = useSelector((state: RootState) => {
        return state.itemsSlicer.selectedItems.map((item) => item.Id);
    });

    const cancelEdit = () => {
        dispatch(clearSelectedItems());
        dispatch(setIsEditMode(false));
    };

    const aproveDeletion = () => {
        apiDeleteItems({ Ids: selectedItemsID });
        dispatch(clearSelectedItems());
        dispatch(setIsEditMode(false));
        dispatch(setQueryParams({ page: 1, search: '' }));
    };

    const cancelDeletion = () => {
        dispatch(clearSelectedItems());
        dispatch(setIsEditMode(false));
    };
    const deleteItem = () => Alert.alert('do you want to delete Items?', 'you cant recover deletet Items!', [
        { onPress: cancelDeletion },
        { text: 'Cancel', onPress: cancelDeletion, style: 'cancel' },
        { text: 'Yes', onPress: aproveDeletion, style: 'destructive' }
    ]);


    const renderPageCount = useMemo(() => {
        return <PagePagination
            pageCount={meta?.pageCount ?? 0}
            page={meta?.page ?? 0}
            hasPreviousPage={meta?.hasPreviousPage!}
            hasNextPage={meta?.hasNextPage!}
            take={meta?.take ?? 0}
            showedItemCount={meta?.itemCount || 0}
            totalItems={totalItems} />;
    }, [meta?.pageCount, meta?.page, meta?.hasNextPage, meta?.hasPreviousPage, meta?.take, totalItems, meta?.itemCount]);

    return (
        <View style={style.container}  >
            {renderPageCount}
            {isEditMode && <>
                <PrimaryButton title={'Cancel'} onPress={cancelEdit} />
                <PrimaryButton title={'Delete'} onPress={deleteItem} buttonColor={'#E74C3C'} />
            </>
            }
        </View>
    );

};

export default ListFooter;