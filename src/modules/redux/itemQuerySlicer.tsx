import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemQueryParams } from '../../types/item';



const initialState = {} as ItemQueryParams;

const itemQuerySlicer = createSlice({
    name: 'itemQueryParams',
    initialState,
    reducers: {
        setItemQueryParams: (state, action: PayloadAction<ItemQueryParams>) => {
            Object.assign(state, action.payload);
        }
    },
});

export const { setItemQueryParams } = itemQuerySlicer.actions;
export default itemQuerySlicer.reducer;