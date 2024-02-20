import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AddClient, ClientsQueryParams} from '../../types/client';


interface IclientSlicer {
    clientsQueryParams: ClientsQueryParams;
    clientForPost: AddClient;
    isClientForEdit: boolean;
    isShowClientModal: boolean;
}



const initialState = {
    clientsQueryParams: {},
    clientForPost: {},
    isClientForEdit: false,
    isShowClientModal: false
} as IclientSlicer;

const clientSlicer = createSlice({
    name: 'clientSlicer',
    initialState,
    reducers: {
        setClientForPost: (state, action: PayloadAction<{[key: string]: string | number;} | AddClient>) => {
            Object.assign(state.clientForPost, action.payload);
        },
        clearClientForPost: (state) => {
            state.clientForPost = {} as AddClient;
        },
        setIsClientForEdit: (state, action: PayloadAction<boolean>) => {
            state.isClientForEdit = action.payload;
        },
        setIsShowClientModal: (state, action: PayloadAction<boolean>) => {
            state.isShowClientModal = action.payload;
        },
        setClientsQueryParams: (state, action: PayloadAction<ClientsQueryParams>) => {
            Object.assign(state.clientsQueryParams, action.payload);
        }
    }
});

export const {
    setClientForPost,
    setClientsQueryParams,
    clearClientForPost,
    setIsClientForEdit,
    setIsShowClientModal} = clientSlicer.actions;
export default clientSlicer.reducer;