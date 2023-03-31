import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InventoryTrackQueryParams } from '../../types/inventoryTrack';



const initialState = {} as InventoryTrackQueryParams;

const inventoryQueryParamsSlicer = createSlice({
    name: 'inventoryQueryParams',
    initialState,
    reducers: {
        setInventoryTrackQueryParams: (state, action: PayloadAction<InventoryTrackQueryParams>) => {
            Object.assign(state, action.payload);
        }
    },
});

export const { setInventoryTrackQueryParams } = inventoryQueryParamsSlicer.actions;
export default inventoryQueryParamsSlicer.reducer;