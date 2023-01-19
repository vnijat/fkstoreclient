import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderStatus } from '../../enums/orderStatus';
import { AddOrderDto, OrderItem } from '../../types/projectOrder';


interface IOrders {
    orderDataForPost: AddOrderDto;
    isOrderForEdit: boolean;
    isShowOrderModal: boolean;
}

const initialState = {
    orderDataForPost: { status: OrderStatus.PENDING },
    isOrderForEdit: false,
    isShowOrderModal: false
} as IOrders;

const ordersSlicer = createSlice({
    name: 'ordersSlicer',
    initialState,
    reducers: {
        setOrderDataForPost: (state, action: PayloadAction<AddOrderDto>) => {
            Object.assign(state.orderDataForPost, action.payload);
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
        updateItemForOrder: (state, action: PayloadAction<{ itemId: number, data: { [key: string]: any; }; }>) => {
            if (state?.orderDataForPost?.orderItems) {
                const itemIndex = state?.orderDataForPost?.orderItems.findIndex((item) => item.itemId == action.payload.itemId);
                state.orderDataForPost.orderItems[itemIndex] = Object.assign(state.orderDataForPost.orderItems[itemIndex], action.payload.data);
            }
        },
        deleteItemFromOrder: (state, action: PayloadAction<{ itemId: number | string; }>) => {
            if (state?.orderDataForPost?.orderItems) {
                const itemIndex = state.orderDataForPost.orderItems.findIndex((item) => item.itemId == action.payload.itemId);
                state.orderDataForPost.orderItems.splice(itemIndex, 1);
            }
        },
        clearOrderDataForPost: (state) => {
            state.orderDataForPost = initialState.orderDataForPost as AddOrderDto;
        },
        setIsOrderForEdit: (state, action: PayloadAction<boolean>) => {
            state.isOrderForEdit = action.payload;
        },
        setIsShowOrderModal: (state, action: PayloadAction<boolean>) => {
            state.isShowOrderModal = action.payload;
        }
    }
});

export const {
    setOrderDataForPost,
    updateItemForOrder,
    addItemForOrder,
    deleteItemFromOrder,
    clearOrderDataForPost,
    setIsOrderForEdit,
    setIsShowOrderModal,
} = ordersSlicer.actions;
export default ordersSlicer.reducer;