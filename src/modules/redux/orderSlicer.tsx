import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddClient } from '../../types/client';
import { Client } from '../../types/clientsQuery';
import { AddOrderDto, OrderItem } from '../../types/projectOrder';
import { AddClientProject } from '../../types/project';


interface IOrders {
    orderDataForPost: AddOrderDto;
}

const initialState = {
    orderDataForPost: {},
} as IOrders;

const ordersSlicer = createSlice({
    name: 'ordersSlicer',
    initialState,
    reducers: {
        setOrderDataForPost: (state, action: PayloadAction<AddOrderDto>) => {
        },
        addItemForOrder: (state, action: PayloadAction<OrderItem>) => {
            const isExist = state.orderDataForPost?.orderItems?.some((item) => item.itemId == action.payload.itemId);
            if (!state.orderDataForPost?.orderItems?.length) {
                state.orderDataForPost.orderItems = [];
            }
            if (!isExist) {
                state.orderDataForPost.orderItems.push(action.payload);
            }
        },
        updateItemForOrder: (state, action: PayloadAction<OrderItem>) => {
            const itemIndex = state?.orderDataForPost?.orderItems.findIndex((item) => item.itemId == action.payload.itemId);
            state.orderDataForPost.orderItems[itemIndex] = action.payload;
        },
        deleteItemFromOrder: (state, action: PayloadAction<{ itemId: number | string; }>) => {
            const itemIndex = state.orderDataForPost.orderItems.findIndex((item) => item.itemId == action.payload.itemId);
            state.orderDataForPost.orderItems.splice(itemIndex, 1);
        },
        clearOrderDataForPost: (state) => {
            state.orderDataForPost = {} as AddOrderDto;
        }
    }
});

export const {
    setOrderDataForPost,
    updateItemForOrder,
    addItemForOrder,
    deleteItemFromOrder,
    clearOrderDataForPost
} = ordersSlicer.actions;
export default ordersSlicer.reducer;