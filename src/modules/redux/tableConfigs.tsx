import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { itemTableDataConfigs } from '../../configs/tableDataConfigs/itemTableConfigs';
import { orderTableDataConfigs } from '../../configs/tableDataConfigs/orderTableConfigs';
import { ITableDataConfig } from '../../containers/simpleTable/types';
import { Item } from '../../types/item';
import { ProjectOrder } from '../../types/projectOrder';

export interface ITableConfigsSlicer {
    item: ITableDataConfig<Item>[];
    order: ITableDataConfig<ProjectOrder>[];

}

type tableNamesType = keyof ITableConfigsSlicer;

const initialState = {
    item: itemTableDataConfigs,
    order: orderTableDataConfigs
} as ITableConfigsSlicer;

const tableConfigsSlicer = createSlice({
    name: 'tableConfigs',
    initialState,
    reducers: {
        setIsHideTableColumn: (state, action: PayloadAction<{ tableName: tableNamesType; index: number; value: boolean; }>) => {
            const column = state[action.payload.tableName][action.payload.index];
            column.hidden = action.payload.value;
        },
        setMoveColumn: (state, action: PayloadAction<{ tableName: tableNamesType, currentIndex: number; newIndex: number; }>) => {
            const table = state[action.payload.tableName];
            const existedColumn = table[action.payload.newIndex];
            const currentColumn = table[action.payload.currentIndex];
            table[action.payload.currentIndex] = existedColumn;
            table[action.payload.newIndex] = currentColumn;
        },
        resetTable: (state, action: PayloadAction<{ tableName: tableNamesType; }>) => {
            const defaultTableConfig = [...initialState[action.payload.tableName]];
            Object.assign(state, { [action.payload.tableName]: defaultTableConfig });
        },
        setNewTableConfigs: (state, action: PayloadAction<{ tableName: tableNamesType; data: ITableConfigsSlicer[keyof ITableConfigsSlicer]; }>) => {
            const newConfigs = action.payload.data;
            Object.assign(state, { [action.payload.tableName]: newConfigs });
        }
    },
});

export const { setIsHideTableColumn, setMoveColumn, resetTable, setNewTableConfigs } = tableConfigsSlicer.actions;
export default tableConfigsSlicer.reducer;