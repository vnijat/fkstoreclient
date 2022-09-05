import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddItemInterface } from '../../types/Item';
import { ItemForPostDefaults } from '../../utils/defaults';

interface ItemsSlicerInterface {
    selectedItems: Array<{ index: number; Id: number; totalPrice: number; }>;
    isEditMode: boolean;
    itemforPost: AddItemInterface;
    isItemForEdit: boolean;
}

const initialState = {
    selectedItems: [],
    isEditMode: false,
    itemforPost: {
        ...ItemForPostDefaults
    },
    isItemForEdit: false
} as ItemsSlicerInterface;

const itemsSlicer = createSlice({
    name: 'itemsSlicer',
    initialState,
    reducers: {
        addItemId: (state, action: PayloadAction<{ index: number; Id: number; totalPrice: number; }>) => {
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
        setIsItemForEdit: (state, action: PayloadAction<boolean>) => {
            state.isItemForEdit = action.payload;
        },
        setItemValueForPost: (state, action: PayloadAction<{ key: string; value: string | number; }>) => {
            Object.assign(state.itemforPost, { [action.payload.key]: action.payload.value });
        },
        clearItemForPosting: (state) => {
            state.itemforPost = ItemForPostDefaults;
        },
        setItemForPost: (state, action: PayloadAction<{ [key: string]: any; }>) => {
            Object.assign(state.itemforPost, action.payload);
        },
    },
});

export const { addItemId, setIsEditMode, clearSelectedItems, setItemForPost, setItemValueForPost, clearItemForPosting, setIsItemForEdit } = itemsSlicer.actions;
export default itemsSlicer.reducer;