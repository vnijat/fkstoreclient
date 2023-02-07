import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IConfigsSlicer {
    apiURL: string;
    language: 'en-EN' | 'ru-RU' | 'az-AZ';
}

const initialState = {
    apiURL: 'http://localhost:3000',
    language: 'en-EN'
} as IConfigsSlicer;

const configsSlicer = createSlice({
    name: 'configs',
    initialState,
    reducers: {
        setApiURL: (state, action: PayloadAction<string>) => {
            state.apiURL = action.payload;
        },
        setLanguage: (state, action: PayloadAction<IConfigsSlicer['language']>) => {
            state.language = action.payload;
        }
    },
});

export const { setApiURL, setLanguage } = configsSlicer.actions;
export default configsSlicer.reducer;