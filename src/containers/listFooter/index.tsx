import React, { FC, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { Alert } from "react-native-windows";
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
}


const ListFooter: FC<ListFooterProps> = ({ meta }) => {
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
    const deleteItem = () => {
        // await alertWithPromise('do you want to delete Items?', 'you cant recover deletet Items!', 'Cancel', 'Yes').then((value) => {
        //     apiDeleteItems({ Ids: selectedItemsID });
        //     dispatch(clearSelectedItems());
        //     dispatch(setIsEditMode(false));
        // }).catch((error) => { console.log('deleteItem===>> ', error); });

        return Alert.alert('do you want to delete Items?', 'you cant recover deletet Items!', [
            { text: 'Cancel', onPress: cancelDeletion, style: 'cancel' },
            { text: 'Yes', onPress: aproveDeletion, style: 'destructive' }
        ], { onDismiss: () => console.log('dissmissed'), cancelable: false });
    };

    const renderPageCount = useMemo(() => {
        return <PagePagination pageCount={meta?.pageCount ?? 0} page={meta?.page} hasPreviousPage={meta?.hasPreviousPage!} hasNextPage={meta?.hasNextPage!} />;

    }, [meta?.pageCount, meta?.page, meta?.hasNextPage, meta?.hasPreviousPage]);

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