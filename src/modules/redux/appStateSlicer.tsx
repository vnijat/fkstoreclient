import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppStateInterface {
    url: string;
    isShowAddItemPopUp: boolean;
}

const initialState = {
    url: '',
    isShowAddItemPopUp: false
} as AppStateInterface;

const appStateSlicer = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        setApiUrl: (state, action: PayloadAction<string>) => {
            state.url = action.payload;
        },
        setIsShowAddItemPopUp: (state, action: PayloadAction<boolean>) => {
            state.isShowAddItemPopUp = action.payload;
        }
    },
});

export const { setApiUrl, setIsShowAddItemPopUp } = appStateSlicer.actions;
export default appStateSlicer.reducer;