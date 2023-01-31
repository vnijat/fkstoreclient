import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PurchaseStatus } from '../../enums/purchase';
import { AddPurchaseDto, PurchaseItem } from '../../types/purchase';


interface IPurchaseSlicer {
    purchaseDataForPost: AddPurchaseDto;
    isPurchaseForedit: boolean;
    isShowPurchaseModal: boolean;
}

const initialState = {
    purchaseDataForPost: { status: PurchaseStatus.IN_PROGRESS },
    isPurchaseForedit: false,
    isShowPurchaseModal: false
} as IPurchaseSlicer;

const purchaseSlicer = createSlice({
    name: 'purchaseSlicer',
    initialState,
    reducers: {
        setPurchaseDataForPost: (state, action: PayloadAction<AddPurchaseDto>) => {
            Object.assign(state.purchaseDataForPost, action.payload);
        },
        addItemForPurchase: (state, action: PayloadAction<PurchaseItem>) => {
            const isExist = state.purchaseDataForPost?.purchaseItems?.some((item) => item.itemId == action.payload.itemId);
            if (!state.purchaseDataForPost?.purchaseItems?.length) {
                state.purchaseDataForPost.purchaseItems = [];
            }
            if (!isExist) {
                state.purchaseDataForPost.purchaseItems.push(action.payload);
            }
        },
        updateItemForPurchase: (state, action: PayloadAction<{ itemId: number, data: { [key: string]: any; }; }>) => {
            if (state?.purchaseDataForPost?.purchaseItems) {
                const itemIndex = state?.purchaseDataForPost?.purchaseItems.findIndex((item) => item.itemId == action.payload.itemId);
                state.purchaseDataForPost.purchaseItems[itemIndex] = Object.assign(state.purchaseDataForPost.purchaseItems[itemIndex], action.payload.data);
            }
        },
        deleteItemFromPurchase: (state, action: PayloadAction<{ itemId: number | string; }>) => {
            if (state?.purchaseDataForPost?.purchaseItems) {
                const itemIndex = state.purchaseDataForPost.purchaseItems.findIndex((item) => item.itemId == action.payload.itemId);
                state.purchaseDataForPost.purchaseItems.splice(itemIndex, 1);
            }
        },
        clearPurchaseDataForPost: (state) => {
            state.purchaseDataForPost = initialState.purchaseDataForPost as AddPurchaseDto;
        },
        setIsPurchaseForEdit: (state, action: PayloadAction<boolean>) => {
            state.isPurchaseForedit = action.payload;
        },
        setIsShowPurchaseModal: (state, action: PayloadAction<boolean>) => {
            state.isShowPurchaseModal = action.payload;
        }
    }
});

export const {
    setPurchaseDataForPost,
    addItemForPurchase,
    updateItemForPurchase,
    deleteItemFromPurchase,
    clearPurchaseDataForPost,
    setIsPurchaseForEdit,
    setIsShowPurchaseModal,
} = purchaseSlicer.actions;
export default purchaseSlicer.reducer;