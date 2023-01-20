import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PurchaseQueryParams } from '../../types/purchase';



const initialState = {} as PurchaseQueryParams;

const purchaseQueryParams = createSlice({
    name: 'purchaseQuery',
    initialState,
    reducers: {
        setPurchaseQueryParams: (state, action: PayloadAction<PurchaseQueryParams>) => {
            Object.assign(state, action.payload);
        }
    },
});

export const { setPurchaseQueryParams } = purchaseQueryParams.actions;
export default purchaseQueryParams.reducer;