import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IConfigsSlicer {
    apiURL: string;
}

const initialState = {
    apiURL: 'http://localhost:3000',
} as IConfigsSlicer;

const configsSlicer = createSlice({
    name: 'configs',
    initialState,
    reducers: {
        setApiURL: (state, action: PayloadAction<string>) => {
            state.apiURL = action.payload;
        }
    },
});

export const { setApiURL } = configsSlicer.actions;
export default configsSlicer.reducer;