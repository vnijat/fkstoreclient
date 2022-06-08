import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddItemInterface } from '../../types/addItem';
import { FilterParamskey } from '../../types/ItemsQuery';
import { ItemForPostDefaults } from '../../utils/defaults';





interface IfilterSlicerInterface {
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
            const isExist = state.selectedWithLabel.filter((item) => item.parent === parent).map(item => item.id).includes(id);
            if (isExist) {
                const filteredParent = state.selectedWithLabel.filter(item => item.parent === parent).filter(item => item.id !== id);
                const selectedWitoutParent = state.selectedWithLabel.filter(item => item.parent !== parent);
                state.selectedWithLabel = [...selectedWitoutParent, ...filteredParent];
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