import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddItemInterface } from '../../types/Item';
import { FilterParamskey } from '../../types/ItemsQuery';
import { ItemForPostDefaults } from '../../utils/defaults';





export interface IfilterSlicerInterface {
    filterByParams: {
        barcodeId: number[];
        categoryId: number[];
        supplierId: number[];
        unitId: number[];
        locationId: number[];
        storeId: number[];
        labelId: number[];
        colorId: number[];
    };
    selectedWithLabel: Array<{
        parent: FilterParamskey;
        id: number;
        label: string;
    }>;
}

const initialState = {
    filterByParams: {
        barcodeId: [],
        categoryId: [],
        supplierId: [],
        unitId: [],
        locationId: [],
        storeId: [],
        labelId: [],
        colorId: []
    },
    selectedWithLabel: []
} as IfilterSlicerInterface;

const filterSlicer = createSlice({
    name: 'filterSlicer',
    initialState,
    reducers: {
        setFilterByParams: (state, action: PayloadAction<{ parent: FilterParamskey; id: number; }>) => {
            const { parent, id } = action.payload;

            const isExist = state.filterByParams[parent].includes(id);
            if (isExist) {
                state.filterByParams[parent] = state.filterByParams[parent]?.filter(currID => currID !== id);
            } else {
                state.filterByParams[parent].push(id);
            }
        },
        setSelectedWithLabel: (state, action: PayloadAction<{ id: number; label: string; parent: FilterParamskey; }>) => {
            const { parent, id } = action.payload;
            const isExist = state.selectedWithLabel.some(item => item.parent === parent && item.id === id);
            if (isExist) {
                const indexOfExisted = state.selectedWithLabel.findIndex((item) => item.parent === parent && item.id === id);
                state.selectedWithLabel.splice(indexOfExisted, 1);
            } else {
                state.selectedWithLabel.push(action.payload);
            }
        },
        clearFilters: () => {
            return initialState;
        }
    },
});

export const { setFilterByParams, setSelectedWithLabel, clearFilters } = filterSlicer.actions;
export default filterSlicer.reducer;