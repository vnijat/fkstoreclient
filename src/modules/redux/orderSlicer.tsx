import {createSlice, isAsyncThunkAction, PayloadAction} from '@reduxjs/toolkit';
import {OrderItemStatus} from '../../enums/orderItemStatus';
import {OrderStatus} from '../../enums/orderStatus';
import {Item} from '../../types/item';
import {AddOrderDto, OrderItem, OrdersQueryParams} from '../../types/projectOrder';
import {Project} from '../../types/project';
import {Toast} from 'react-native-toast-notifications';
import {IToastData} from '../../components/customToastComponent';
import {toastVariants} from '../../types/toast';


interface IOrders {
    ordersQueryParams: OrdersQueryParams;
    orderDataForPost: AddOrderDto;
    isOrderForEdit: boolean;
    isShowOrderModal: boolean;
    selectedProject: Project | null;
}

const initialState = {
    ordersQueryParams: {},
    orderDataForPost: {status: OrderStatus.PENDING},
    isOrderForEdit: false,
    isShowOrderModal: false,
    selectedProject: null
} as IOrders;

const ordersSlicer = createSlice({
    name: 'ordersSlicer',
    initialState,
    reducers: {
        setOrderDataForPost: (state, action: PayloadAction<AddOrderDto>) => {
            Object.assign(state.orderDataForPost, action.payload);
            const orderItems = state.orderDataForPost?.orderItems;
            if (orderItems?.every((order) => order.projectId === orderItems[0].projectId)) {
                state.selectedProject = orderItems[0]?.project as Project;
            }
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
                projectId: state.selectedProject?.id,
                storeId: item.store.id,
                store: item.store

            };
            if (!state.orderDataForPost?.orderItems?.length) {
                state.orderDataForPost.orderItems = [];
            }
            if (isExist) {
                Toast.show('Custom Toast', {
                    duration: 3000,
                    data: {
                        title: '',
                        message: '',
                        type: 'info',
                    } as IToastData
                });
            } else {
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
        setSelectedProject: (state, action: PayloadAction<Project | null>) => {
            state.selectedProject = action.payload;
        },
        setProjectIdForAllOrderItems: (state, action: PayloadAction<number>) => {
            if (state?.orderDataForPost?.orderItems?.length) {
                state.orderDataForPost.orderItems.forEach((item) => item.projectId = action.payload);
            }
        },
        setOrdersQueryParams: (state, action: PayloadAction<OrdersQueryParams>) => {
            Object.assign(state.ordersQueryParams, action.payload);
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
    setSelectedProject,
    setProjectIdForAllOrderItems,
    setOrdersQueryParams
} = ordersSlicer.actions;
export default ordersSlicer.reducer;