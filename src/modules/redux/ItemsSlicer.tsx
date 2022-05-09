import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddItemInterface } from '../../types/addItem';
import { ItemForPostDefaults } from '../../utils/defaults';

interface ItemsSlicerInterface {
    selectedItems: Array<{ index: number; Id: number; }>;
    isEditMode: boolean;
    itemforPost: AddItemInterface;
}

const initialState = {
    selectedItems: [],
    isEditMode: false,
    itemforPost: {
        ...ItemForPostDefaults
    }
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
        },
        setItemForPost: (state, action: PayloadAction<{ key: string; value: string | number; }>) => {
            Object.assign(state.itemforPost, { [action.payload.key]: action.payload.value });
        },
        clearItemForPosting: (state) => {
            state.itemforPost = ItemForPostDefaults;
        }
    },
});

export const { addItemId, setIsEditMode, clearSelectedItems, setItemForPost, clearItemForPosting } = itemsSlicer.actions;
export default itemsSlicer.reducer;