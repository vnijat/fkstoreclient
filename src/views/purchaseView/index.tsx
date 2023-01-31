import React, { FC } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import PaginationContainer from '../../containers/paginationContainer';
import { useGetPurchasesQuery } from '../../modules/api/purchase.api';
import { setPurchaseQueryParams } from '../../modules/redux/purchaseQuerySlicer';
import { setIsShowPurchaseModal } from '../../modules/redux/purchaseSlicer';
import { RootState, useAppDispatch } from '../../modules/redux/store';
import AddEditPurchaseModal from './addEditPurchaseModal';
import PurchaseList from './purchaseList';
import PurchaseSearch from './purchaseSearch';
import { getStyle } from './styles';


interface IPurchaseView {

}

const PurchaseView = ({ }: IPurchaseView) => {
    const style = getStyle();
    const dispatch = useAppDispatch();
    const purchaseQueryParams = useSelector((state: RootState) => state.purchaseQueryParams);
    const isPurchaseModalOpen = useSelector((state: RootState) => state.purchaseSlicer.isShowPurchaseModal);
    const { data: queryData } = useGetPurchasesQuery(purchaseQueryParams, {
        selectFromResult: ({ data, isLoading, isUninitialized, error }) => ({
            data,
            isLoading
        }
        ),
        pollingInterval: 5000
    });

    const onCloseOrderModal = () => {
        dispatch(setIsShowPurchaseModal(false));
    };



    return (
        <View style={style.container}>
            {isPurchaseModalOpen && <AddEditPurchaseModal isOpen={isPurchaseModalOpen} onClose={onCloseOrderModal} />}
            <View style={style.searchContainer}>
                <View style={{ flex: 0.2 }}>
                    <PurchaseSearch searchValue={purchaseQueryParams.search ?? ''} />
                </View>
                <View style={{ flex: 0.7 }}>
                    <PurchaseList data={queryData?.purchases ?? []} />
                </View>
                <View style={style.footerContainer}>
                    <PaginationContainer actionFunction={setPurchaseQueryParams} meta={queryData?.meta!} />
                </View>
            </View>
        </View>
    );
};
export default PurchaseView;
