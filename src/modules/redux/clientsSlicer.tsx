import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddClient } from '../../types/client';


interface IclientSlicer {
    clientForPost: AddClient;
    isClientForEdit: boolean;
}



const initialState = {
    clientForPost: {},
    isClientForEdit: false

} as IclientSlicer;

const clientSlicer = createSlice({
    name: 'clientSlicer',
    initialState,
    reducers: {
        setClientForPost: (state, action: PayloadAction<AddClient>) => {
            Object.assign(state.clientForPost, action.payload);
        },
        clearClientForPost: (state) => {
            state.clientForPost = {} as AddClient;
        },
        setIsClientForEdit: (state, action: PayloadAction<boolean>) => {
            state.isClientForEdit = action.payload;
        },
    }
});

export const { setClientForPost, clearClientForPost, setIsClientForEdit } = clientSlicer.actions;
export default clientSlicer.reducer;