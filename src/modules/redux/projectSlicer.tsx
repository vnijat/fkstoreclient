import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Client } from '../../types/client';
import { AddClientProject } from '../../types/project';


interface IProjectSlicer {
    projectDataForPost: AddClientProject;
    isProjectForEdit: boolean;
    isShowProjectAddEditModal: boolean;
    isOpenClientInfoModal: boolean;
    clientInfoData: Client;
    isShowProjectOrdersModal: boolean;
    isShowOtherExpensesModal: boolean;
    projectIdForRequest?: number | string;
}



const initialState = {
    projectDataForPost: {},
    isProjectForEdit: false,
    isShowProjectAddEditModal: false,
    isOpenClientInfoModal: false,
    isShowOtherExpensesModal: false,
    isShowProjectOrdersModal: false,
    projectIdForRequest: undefined,
    clientInfoData: {}
} as IProjectSlicer;

const projectSlicer = createSlice({
    name: 'projectSlicer',
    initialState,
    reducers: {
        setProjectDataForPost: (state, action: PayloadAction<AddClientProject>) => {
            Object.assign(state.projectDataForPost, action.payload);
        },
        clearProjectForPost: (state) => {
            state.projectDataForPost = {} as AddClientProject;
        },
        setIsProjectForEdit: (state, action: PayloadAction<boolean>) => {
            state.isProjectForEdit = action.payload;
        },
        setIsShowProjectAddEditModal: (state, action: PayloadAction<boolean>) => {
            state.isShowProjectAddEditModal = action.payload;
        },
        setIsOpenClientInfoModal: (state, action: PayloadAction<boolean>) => {
            state.isOpenClientInfoModal = action.payload;
        },
        setClientInfoData: (state, action: PayloadAction<Client>) => {
            Object.assign(state.clientInfoData, action.payload);
        },
        setIsShowProjectOrdersModal: (state, action: PayloadAction<boolean>) => {
            state.isShowProjectOrdersModal = action.payload;
        },
        setIsShowOtherExpensesModal: (state, action: PayloadAction<boolean>) => {
            state.isShowOtherExpensesModal = action.payload;
        },
        setProjectIdForRequest: (state, action: PayloadAction<number | string>) => {
            state.projectIdForRequest = action.payload;
        },

    }
});

export const {
    setProjectDataForPost,
    clearProjectForPost,
    setIsProjectForEdit,
    setIsShowProjectAddEditModal,
    setIsOpenClientInfoModal,
    setClientInfoData,
    setIsShowProjectOrdersModal,
    setProjectIdForRequest,
    setIsShowOtherExpensesModal
} = projectSlicer.actions;
export default projectSlicer.reducer;