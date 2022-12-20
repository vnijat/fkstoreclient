import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderQueryResponse, OrdersQueryParams } from '../../types/projectOrder';



const initialState = {} as OrdersQueryParams;

const OrdersQueryParam = createSlice({
    name: 'ordersQuery',
    initialState,
    reducers: {
        setOrdersQueryParams: (state, action: PayloadAction<OrdersQueryParams>) => {
            Object.assign(state, action.payload);
        }
    },
});

export const { setOrdersQueryParams } = OrdersQueryParam.actions;
export default OrdersQueryParam.reducer;