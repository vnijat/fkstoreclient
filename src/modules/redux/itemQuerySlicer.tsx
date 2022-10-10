import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { itemQueryParams } from '../../types/ItemsQuery';



const initialState = {} as itemQueryParams;

const itemQuerySlicer = createSlice({
    name: 'itemQueryParams',
    initialState,
    reducers: {
        setItemQueryParams: (state, action: PayloadAction<itemQueryParams>) => {
            Object.assign(state, action.payload);
        }
    },
});

export const { setItemQueryParams } = itemQuerySlicer.actions;
export default itemQuerySlicer.reducer;