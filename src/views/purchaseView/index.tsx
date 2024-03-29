import React, { FC } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import PaginationContainer from '../../containers/paginationContainer';
import SimpleTable from '../../containers/simpleTable';
import { IContextMenuButton } from '../../containers/simpleTable/types';
import { useGetPurchasesQuery } from '../../modules/api/purchase.api';
import { setPurchaseQueryParams } from '../../modules/redux/purchaseQuerySlicer';
import { setIsShowPurchaseModal } from '../../modules/redux/purchaseSlicer';
import { RootState, useAppDispatch } from '../../modules/redux/store';
import { PurchaseDto } from '../../types/purchase';
import AddEditPurchaseModal from './addEditPurchaseModal';
import PurchaseDataProvider from './provider/data';
import PurchaseLogicProvider from './provider/logic';
import PurchaseList from './purchaseList';
import PurchaseSearch from './purchaseSearch';
import { getStyle } from './styles';


interface IPurchaseView {

}

const PurchaseView = ({ }: IPurchaseView) => {
    const logicProvider = PurchaseLogicProvider();
    const dataProvider = PurchaseDataProvider();
    const {
        handlePagination,
        handleOnPressRow,
        handlePurchaseDelete,
        handleNewTableConfigs,
        handleResetTableConfigs,
        onClosePurchaseModal
    } = logicProvider;
    const {
        queryData: { data, isLoading, },
        purchaseTableConfigs,
        isPurchaseModalOpen,
        purchaseQueryParams

    } = dataProvider;
    const style = getStyle();


    const contextMenuButtons: IContextMenuButton<PurchaseDto>[] = [
        { title: 'Delete', onPress: (data) => handlePurchaseDelete(data.id!) }
    ];

    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 0.05 }} />
            <View style={style.container}>
                {isPurchaseModalOpen && <AddEditPurchaseModal isOpen={isPurchaseModalOpen} onClose={onClosePurchaseModal} />}
                <View style={{ flexShrink: 1 }}>
                    <PurchaseSearch  {...{ logicProvider, dataProvider }} />
                </View>
                <View style={{ flex: 1 }}>
                    {/* <PurchaseList data={data?.purchases ?? []} /> */}
                    <SimpleTable
                        tableData={data?.purchases ?? []}
                        tableDataConfig={purchaseTableConfigs}
                        isLoading={isLoading}
                        onPressRow={handleOnPressRow}
                        contextMenuButtons={contextMenuButtons}
                        getNewTableConfig={handleNewTableConfigs}
                        onResetTable={handleResetTableConfigs}
                    />
                </View>
                <View style={style.footerContainer}>
                    <PaginationContainer paginationHandler={handlePagination} meta={data?.meta!} />
                </View>
            </View>
        </View>
    );
};
export default PurchaseView;
