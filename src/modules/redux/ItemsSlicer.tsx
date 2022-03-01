import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ItemsSlicerInterface {
    selectedItems: Array<{ index: number; Id: number; }>;
    isEditMode: boolean;
}

const initialState = {
    selectedItems: [],
    isEditMode: false
} as ItemsSlicerInterface;

const itemsSlicer = createSlice({
    name: 'itemsSlicer',
    initialState,
    reducers: {
        addItemId: (state, action: PayloadAction<{ index: number; Id: number; }>) => {
            const { payload } = action;
            if (state.selectedItems.some(item => item.Id === payload.Id)) {
                state.selectedItems = state.selectedItems.filter(({ Id }) => Id !== payload.Id);
            } else {
                state.selectedItems.push(payload);
            }
        },
        clearSelectedItems: (state) => {
            state.selectedItems = [];
        }
        ,
        setIsEditMode: (state, action: PayloadAction<boolean>) => {
            state.isEditMode = action.payload;
        }
    },
});

export const { addItemId, setIsEditMode, clearSelectedItems } = itemsSlicer.actions;
export default itemsSlicer.reducer;