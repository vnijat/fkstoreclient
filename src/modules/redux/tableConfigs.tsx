import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { itemTableDataConfigs } from '../../configs/tableDataConfigs/itemTableConfigs';
import { ITableDataConfig } from '../../containers/simpleTable/types';
import { Item } from '../../types/item';

interface ITableConfigsSlicer {
    item: ITableDataConfig<Item>[];
}

const initialState = {
    item: itemTableDataConfigs
} as ITableConfigsSlicer;

const tableConfigsSlicer = createSlice({
    name: 'tableConfigs',
    initialState,
    reducers: {
        setIsHideTableColumn: (state, action: PayloadAction<{ tableName: keyof ITableConfigsSlicer; index: number; value: boolean; }>) => {
            const column = state[action.payload.tableName][action.payload.index];
            column.hidden = action.payload.value;
        },
        setMoveColumn: (state, action: PayloadAction<{ tableName: keyof ITableConfigsSlicer, currentIndex: number; newIndex: number; }>) => {
            const table = state[action.payload.tableName];
            const existedColumn = table[action.payload.newIndex];
            const currentColumn = table[action.payload.currentIndex];
            table[action.payload.currentIndex] = existedColumn;
            table[action.payload.newIndex] = currentColumn;
        },
        resetTable: (state) => {
            state.item = itemTableDataConfigs;
        }
    },
});

export const { setIsHideTableColumn, setMoveColumn, resetTable } = tableConfigsSlicer.actions;
export default tableConfigsSlicer.reducer;