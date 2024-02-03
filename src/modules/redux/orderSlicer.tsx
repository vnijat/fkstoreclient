import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OrderItemStatus} from '../../enums/orderItemStatus';
import {OrderStatus} from '../../enums/orderStatus';
import {Item} from '../../types/item';
import {AddOrderDto, OrderItem} from '../../types/projectOrder';


interface IOrders {
    orderDataForPost: AddOrderDto;
    isOrderForEdit: boolean;
    isShowOrderModal: boolean;
    projectId: number | null;
}

const initialState = {
    orderDataForPost: {status: OrderStatus.PENDING},
    isOrderForEdit: false,
    isShowOrderModal: false,
    projectId: null
} as IOrders;

const ordersSlicer = createSlice({
    name: 'ordersSlicer',
    initialState,
    reducers: {
        setOrderDataForPost: (state, action: PayloadAction<AddOrderDto>) => {
            Object.assign(state.orderDataForPost, action.payload);
        },
        addItemForOrder: (state, action: PayloadAction<Item>) => {
            const item = action.payload;
            const isExist = state.orderDataForPost?.orderItems?.some((orderItem) => orderItem.itemId == item.id);
            const orderItem = {
                itemId: item.id as number,
                unit: item.unit.name,
                name: item.name,
                quantity: 0,
                barcode: item.barcode,
                itemAtStock: item.quantity,
                pricePerUnit: item.costPrice,
                status: OrderItemStatus.IN_USE,
                projectId: state.projectId,
                storeId: item.store.id,
                store: item.store

            };
            if (!state.orderDataForPost?.orderItems?.length) {
                state.orderDataForPost.orderItems = [];
            }
            if (!isExist) {
                state.orderDataForPost.orderItems.push(orderItem);
            }
        },
        updateItemForOrder: (state, action: PayloadAction<{itemId: number, data: {[key: string]: any;};}>) => {
            if (state?.orderDataForPost?.orderItems) {
                const itemIndex = state?.orderDataForPost?.orderItems.findIndex((item) => item.itemId == action.payload.itemId);
                state.orderDataForPost.orderItems[itemIndex] = Object.assign(state.orderDataForPost.orderItems[itemIndex], action.payload.data);
            }
        },
        deleteItemFromOrder: (state, action: PayloadAction<{itemId: number | string;}>) => {
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
        },
        setProjectId: (state, action: PayloadAction<number>) => {
            state.projectId = action.payload;
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
    setProjectId
} = ordersSlicer.actions;
export default ordersSlicer.reducer;