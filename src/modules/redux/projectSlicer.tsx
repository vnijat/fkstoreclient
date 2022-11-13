import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddClient } from '../../types/client';
import { Client } from '../../types/clientsQuery';
import { AddClientProject } from '../../types/project';


interface IProjectSlicer {
    projectForPost: AddClientProject;
    isProjectForEdit: boolean;
    isShowProjectModal: boolean;
    isOpenClientInfoModal: boolean;
    clientInfoData: Client;
}



const initialState = {
    projectForPost: {},
    isProjectForEdit: false,
    isShowProjectModal: false,
    isOpenClientInfoModal: false,
    clientInfoData: {}
} as IProjectSlicer;

const projectSlicer = createSlice({
    name: 'projectSlicer',
    initialState,
    reducers: {
        setClientForPost: (state, action: PayloadAction<AddClientProject>) => {
            Object.assign(state.projectForPost, action.payload);
        },
        clearProjectForPost: (state) => {
            state.projectForPost = {} as AddClientProject;
        },
        setIsProjectForEdit: (state, action: PayloadAction<boolean>) => {
            state.isProjectForEdit = action.payload;
        },
        setIsShowProjectModal: (state, action: PayloadAction<boolean>) => {
            state.isShowProjectModal = action.payload;
        },
        setIsOpenClientInfoModal: (state, action: PayloadAction<boolean>) => {
            state.isOpenClientInfoModal = action.payload;
        },
        setClientInfoData: (state, action: PayloadAction<Client>) => {
            Object.assign(state.clientInfoData, action.payload);
        },
    }
});

export const {
    setClientForPost,
    clearProjectForPost,
    setIsProjectForEdit,
    setIsShowProjectModal,
    setIsOpenClientInfoModal,
    setClientInfoData
} = projectSlicer.actions;
export default projectSlicer.reducer;