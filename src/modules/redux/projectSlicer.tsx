import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddClient } from '../../types/client';
import { AddClientProject } from '../../types/project';


interface IProjectSlicer {
    projectForPost: AddClientProject;
    isProjectForEdit: boolean;
    isShowProjectModal: boolean;
}



const initialState = {
    projectForPost: {},
    isProjectForEdit: false,
    isShowProjectModal: false
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
    }
});

export const { setClientForPost, clearProjectForPost, setIsProjectForEdit, setIsShowProjectModal } = projectSlicer.actions;
export default projectSlicer.reducer;