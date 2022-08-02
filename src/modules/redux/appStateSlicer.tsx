import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppStateInterface {
    url: string;
    isShowAddItemPopUp: boolean;
    isShowAddOptionsModal: boolean;
}

const initialState = {
    url: 'http://localhost:3000',
    isShowAddItemPopUp: false,
    isShowAddOptionsModal: false

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
        },
        setIsShowAddOptionsModal: (state, action: PayloadAction<boolean>) => {
            state.isShowAddOptionsModal = action.payload;
        }
    },
});

export const { setApiUrl, setIsShowAddItemPopUp, setIsShowAddOptionsModal } = appStateSlicer.actions;
export default appStateSlicer.reducer;