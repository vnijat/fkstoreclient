import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppStateInterface {
    isShowAddItemPopUp: boolean;
    isShowAddOptionsModal: boolean;
    isShowSettingsModal: boolean;
}

const initialState = {
    isShowAddItemPopUp: false,
    isShowAddOptionsModal: false,
    isShowSettingsModal: false

} as AppStateInterface;

const appStateSlicer = createSlice({
    name: 'appState',
    initialState, 
    reducers: {
        setIsShowAddItemPopUp: (state, action: PayloadAction<boolean>) => {
            state.isShowAddItemPopUp = action.payload;
        },
        setIsShowAddOptionsModal: (state, action: PayloadAction<boolean>) => {
            state.isShowAddOptionsModal = action.payload;
        },
        setIsShowSettingsModal: (state, action: PayloadAction<boolean>) => {
            state.isShowSettingsModal = action.payload;
        }
    },
});

export const { setIsShowAddItemPopUp, setIsShowAddOptionsModal, setIsShowSettingsModal } = appStateSlicer.actions;
export default appStateSlicer.reducer;