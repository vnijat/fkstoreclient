import { ActionCreator, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddBarcode } from '../../types/barcode';
import { AddCategory } from '../../types/category';
import { AddColor } from '../../types/color';
import { AddLabel } from '../../types/label';
import { AddLocation } from '../../types/location';
import { AddStore } from '../../types/store';
import { AddSupplier } from '../../types/supplier';
import { AddUnit } from '../../types/unit';

export interface IItemOptions {
    options: {
        color?: AddColor;
        store?: AddStore;
        label?: AddLabel;
        location?: AddLocation;
        category?: AddCategory;
        unit?: AddUnit;
        supplier?: AddSupplier;
        barcode?: AddBarcode;
    },
    isOptionForEdit: boolean;
}

const initialState = {
    options: {

    },
    isOptionForEdit: false
} as IItemOptions;

const itemOptions = createSlice({
    name: 'itemOptions',
    initialState,
    reducers: {
        addItemOption: (state, action: PayloadAction<{ [key: string]: object; }>) => {
            Object.assign(state.options, action.payload);
        },
        clearItemOptions: (state) => {
            state.options = {};
        },
        setIsOptionForEdit: (state, action: PayloadAction<boolean>) => {
            state.isOptionForEdit = action.payload;
        }

    },
});

export const { addItemOption, clearItemOptions, setIsOptionForEdit } = itemOptions.actions;
export default itemOptions.reducer;