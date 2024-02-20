import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {InventoryTrackQueryParams, InventoryTransfersParams} from "../../types/inventory";



interface IInventorySclier {
    inventoryTrackParams: InventoryTrackQueryParams;
    inventoryTransfersParams: InventoryTransfersParams;

}




const initialState = {
    inventoryTrackParams: {}

} as IInventorySclier;



const inventorySlicer = createSlice({
    name: 'inventorySlicer',
    initialState,
    reducers: {
        setInventoryTrackQueryParams: (state, action: PayloadAction<InventoryTrackQueryParams>) => {
            Object.assign(state.inventoryTrackParams, action.payload);
        },
        setInventoryTransfersParams: (state, action: PayloadAction<InventoryTransfersParams>) => {
            Object.assign(state.inventoryTransfersParams, action.payload);
        }
    }
});

export const {
    setInventoryTrackQueryParams
} = inventorySlicer.actions;

export default inventorySlicer.reducer;