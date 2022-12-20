import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddItemInterface } from '../../types/Item';
import { ItemForPostDefaults } from '../../utils/defaults';

interface ItemsSlicerInterface {
    selectedItems: Array<{ index: number; Id: number; totalPrice: number; }>;
    isEditMode: boolean;
    itemforPost: AddItemInterface;
    isItemForEdit: boolean;
    isShowItemModal: boolean;
    isShowAddEditModal: boolean;
    itemIdForFullResponse?: number;
}

const initialState = {
    selectedItems: [],
    isEditMode: false,
    itemforPost: {
        ...ItemForPostDefaults
    },
    isItemForEdit: false,
    isShowItemModal: false,
    itemIdForFullResponse: undefined,
    isShowAddEditModal: false
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
        setItemValueForPost: (state, action: PayloadAction<{ [key: string]: string | number; }>) => {
            Object.assign(state.itemforPost, action.payload);
        },
        clearItemForPosting: (state) => {
            const { id, updatedAt, createdAt, name, description, code, ...rest } = state.itemforPost;
            state.itemforPost = { name: '', description: '', code: '', ...rest };
        },
        setItemForPost: (state, action: PayloadAction<{ [key: string]: any; }>) => {
            Object.assign(state.itemforPost, action.payload);
        },
        setIsShowItemModal: (state, action: PayloadAction<boolean>) => {
            state.isShowItemModal = action.payload;
        },
        setItemIdForFullResponse: (state, action: PayloadAction<number>) => {
            state.itemIdForFullResponse = action.payload;
        },
        setIsShowAddEditModal: (state, action: PayloadAction<boolean>) => {
            state.isShowAddEditModal = action.payload;
        },
    },
});

export const {
    addItemId,
    setIsEditMode,
    setItemForPost,
    setIsItemForEdit,
    setIsShowItemModal,
    clearSelectedItems,
    setItemValueForPost,
    clearItemForPosting,
    setItemIdForFullResponse,
    setIsShowAddEditModal
} = itemsSlicer.actions;
export default itemsSlicer.reducer;