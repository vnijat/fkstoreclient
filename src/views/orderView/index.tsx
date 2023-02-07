import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import PaginationContainer from '../../containers/paginationContainer';
import { useGetOrdersQuery } from '../../modules/api/orders.api';
import { setOrdersQueryParams } from '../../modules/redux/orderQuerySlicer';
import { setIsShowOrderModal } from '../../modules/redux/orderSlicer';
import { RootState, useAppDispatch } from '../../modules/redux/store';
import { Colors } from '../../utils/colors';
import AddEditOrderModal from './components/addEditOrderModal';
import OrderList from './components/orderList';
import OrderSearch from './components/orderSearch';
import { getStyle } from './styles';


interface IorderView {
    navigation: StackNavigationProp<{}>;
}

export const OrderView: FC<IorderView> = ({ navigation }) => {
    const style = getStyle();
    const dispatch = useAppDispatch();
    const ordersQueryParams = useSelector((state: RootState) => state.ordersQueryParams);
    const isOrderModalOpen = useSelector((state: RootState) => state.ordersSlicer.isShowOrderModal);
    const { data: queryData } = useGetOrdersQuery(ordersQueryParams, {
        selectFromResult: ({ data, isLoading, isUninitialized, error }) => ({
            data,
        }
        ),
        pollingInterval: 5000
    });

    const onCloseOrderModal = () => {
        dispatch(setIsShowOrderModal(false));
    };



    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 0.05 }} />
            <View style={style.container}>
                {isOrderModalOpen && <AddEditOrderModal isOpen={isOrderModalOpen} onClose={onCloseOrderModal} />}
                <View style={{ flex: 0.2 }}>
                    <OrderSearch searchValue={ordersQueryParams.search ?? ''} />
                </View>
                <View style={{ flex: 0.7 }}>
                    <OrderList data={queryData?.orders ?? []} />
                </View>
                <View style={{ flex: 0.1, backgroundColor: Colors.CARD_HEADER_COLOR, justifyContent: 'center' }}>
                    <PaginationContainer actionFunction={setOrdersQueryParams} meta={queryData?.meta!} />
                </View>
            </View>
        </View>
    );
};
