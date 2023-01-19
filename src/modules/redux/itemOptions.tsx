import { ActionCreator, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddCategory, AddColor, AddLabel, AddLocation, AddStore, AddSupplier, AddUnit } from '../../types/itemOptions';

export interface IItemOptions {
    options: {
        color: AddColor | {};
        store: AddStore | {};
        label: AddLabel | {};
        location: AddLocation | {};
        category: AddCategory | {};
        unit: AddUnit | {};
        supplier: AddSupplier | {};
    },
    isOptionForEdit: boolean;
    isOpenOptionModal: boolean;
    optionNameForModal?: keyof IItemOptions['options'];
}

const defaultOptions = {
    color: {},
    store: {},
    label: {},
    location: {},
    category: {},
    unit: {},
    supplier: {},
};



const initialState = {
    options: {
        color: {},
        store: {},
        label: {},
        location: {},
        category: {},
        unit: {},
        supplier: {},
    },
    isOptionForEdit: false,
    isOpenOptionModal: false,
} as IItemOptions;

const itemOptions = createSlice({
    name: 'itemOptions',
    initialState,
    reducers: {
        addItemOption: (state, action: PayloadAction<{ optionName: keyof IItemOptions['options'], value: { [key: string]: string | number; }; }>) => {
            Object.assign(state.options[action.payload.optionName], action.payload.value);
        },
        clearItemOptions: (state) => {
            state.options = defaultOptions;
        },
        setIsOptionForEdit: (state, action: PayloadAction<boolean>) => {
            state.isOptionForEdit = action.payload;
        },
        setIsOpenOptionModal: (state, action: PayloadAction<boolean>) => {
            state.isOpenOptionModal = action.payload;
        },
        setOptionNameForModal: (state, action: PayloadAction<keyof IItemOptions['options']>) => {
            state.optionNameForModal = action.payload;
        }

    },
});

export const { addItemOption, clearItemOptions, setIsOptionForEdit, setIsOpenOptionModal, setOptionNameForModal } = itemOptions.actions;
export default itemOptions.reducer;