import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentMethod, PurchaseStatus } from '../../enums/purchase';
import { Item } from '../../types/item';
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
        addItemForPurchase: (state, action: PayloadAction<Item>) => {
            const item = action.payload;
            const isExist = state.purchaseDataForPost?.purchaseItems?.some((purchaseItem) => purchaseItem.itemId == item.id);
            const purchaseItem = {
                itemId: item.id as number,
                unit: item.unit.name,
                name: item.name,
                quantity: 0,
                barcode: item.barcode,
                updateMainPrice: false,
                pricePerUnit: item.costPrice,
                paymentMethod: PaymentMethod.CASH,
                fullfilled: false,
                supplierId: item.supplier.id || null,
                poInfo: '',
                storeId: item.store.id!,
                store: item.store
            };
            if (!state.purchaseDataForPost?.purchaseItems?.length) {
                state.purchaseDataForPost.purchaseItems = [];
            }
            if (!isExist) {
                state.purchaseDataForPost.purchaseItems.push(purchaseItem);
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