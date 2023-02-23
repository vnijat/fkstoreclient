import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback } from 'react';
import { View } from 'react-native';
import PaginationContainer from '../../containers/paginationContainer';
import SimpleTable from '../../containers/simpleTable';
import { IContextMenuButton } from '../../containers/simpleTable/types';
import { ProjectOrder } from '../../types/projectOrder';
import { Colors } from '../../utils/colors';
import AddEditOrderModal from './components/addEditOrderModal';
import OrderList from './components/orderList';
import OrderSearch from './components/orderSearch';
import OrderDataProvider from './provider/data';
import OrderLogicProvider from './provider/logic';
import { getStyle } from './styles';


interface IorderView {
    navigation: StackNavigationProp<{}>;
}

export const OrderView: FC<IorderView> = ({ navigation }) => {
    const { queryData: { data: queryData, isLoading },
        ordersQueryParams,
        tableConfigs,
        isShowOrderModal, } = OrderDataProvider();
    const {
        onPressRowItem,
        onResetTable,
        setNewTableConfig,
        onCloseModal,
        handleOndeleteOrder,
        handlePagination
    } = OrderLogicProvider();
    const style = getStyle();

    const tableContextMenuButtons: IContextMenuButton<ProjectOrder>[] = [
        {
            title: 'Delete',
            onPress: handleOndeleteOrder
        }
    ];

    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 0.05 }} />
            <View style={style.container}>
                {isShowOrderModal && <AddEditOrderModal isOpen={isShowOrderModal} onClose={onCloseModal} />}
                <View style={{ flexShrink: 1 }}>
                    <OrderSearch searchValue={ordersQueryParams.search ?? ''} />
                </View>
                <View style={{ flex: 1 }}>
                    {/* <OrderList data={queryData?.orders ?? []} /> */}
                    <SimpleTable
                        tableData={queryData?.orders ?? []}
                        tableDataConfig={tableConfigs}
                        onResetTable={onResetTable}
                        getNewTableConfig={setNewTableConfig}
                        onPressRow={onPressRowItem}
                        contextMenuButtons={tableContextMenuButtons}
                        isLoading={isLoading}
                    />
                </View>
                <View style={{ flex: 0.1, backgroundColor: Colors.CARD_HEADER_COLOR, justifyContent: 'center' }}>
                    <PaginationContainer paginationHandler={handlePagination} meta={queryData?.meta!} />
                </View>
            </View>
        </View>
    );
};
