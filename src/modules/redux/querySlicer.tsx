import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryParams } from '../../types/ItemsQuery';



const initialState = {
    limit: 21,
    offset: 0,
} as QueryParams;

const querySlicer = createSlice({
    name: 'queryParams',
    initialState,
    reducers: {
        setQueryParams: (state, action: PayloadAction<QueryParams>) => {
            Object.assign(state, action.payload);
        }
    },
});

export const { setQueryParams } = querySlicer.actions;
export default querySlicer.reducer;