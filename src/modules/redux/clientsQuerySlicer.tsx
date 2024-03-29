import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClientsQueryParams } from '../../types/client';



const initialState = {} as ClientsQueryParams;

const clientQuery = createSlice({
    name: 'clientQuery',
    initialState,
    reducers: {
        setClientsQueryParams: (state, action: PayloadAction<ClientsQueryParams>) => {
            Object.assign(state, action.payload);
        }
    },
});

export const { setClientsQueryParams } = clientQuery.actions;
export default clientQuery.reducer;