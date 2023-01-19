import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProjectsQueryParams } from '../../types/project';



const initialState = {} as ProjectsQueryParams;

const ProjectQuery = createSlice({
    name: 'projectQuery',
    initialState,
    reducers: {
        setProjectsQueryParams: (state, action: PayloadAction<ProjectsQueryParams>) => {
            Object.assign(state, action.payload);
        }
    },
});

export const { setProjectsQueryParams } = ProjectQuery.actions;
export default ProjectQuery.reducer;