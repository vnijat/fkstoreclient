import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddCategory } from '../../types/category';
import { AddColor } from '../../types/color';
import { AddLabel } from '../../types/label';
import { AddLocation } from '../../types/location';
import { AddStore } from '../../types/store';
import { AddSupplier } from '../../types/supplier';
import { AddUnit } from '../../types/unit';

export interface IItemOptions {
    color?: AddColor;
    store?: AddStore;
    label?: AddLabel;
    location?: AddLocation;
    category?: AddCategory;
    unit?: AddUnit;
    supplier?: AddSupplier;
}

const initialState = {
} as IItemOptions;

const itemOptions = createSlice({
    name: 'itemOptions',
    initialState,
    reducers: {
        addItemOptions: (state, action: PayloadAction<{ [key: string]: object; }>) => {
            Object.assign(state, action.payload);
        },
        clearItemOptions: () => {
            return initialState;
        }
    },
});

export const { addItemOptions, clearItemOptions } = itemOptions.actions;
export default itemOptions.reducer;