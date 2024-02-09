import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {inventoryTrackTableConfig} from '../../configs/tableDataConfigs/inventoryTrackTableConfigs';
import {itemTableDataConfigs} from '../../configs/tableDataConfigs/itemTableConfigs';
import {orderTableDataConfigs} from '../../configs/tableDataConfigs/orderTableConfigs';
import {projectTableDataConfigs} from '../../configs/tableDataConfigs/projectTableConfigs';
import {purchaseTableDataConfigs} from '../../configs/tableDataConfigs/purchaseTableConfigs';
import {ITableDataConfig} from '../../containers/simpleTable/types';
import {InventoryTrackData} from '../../types/inventoryTrack';
import {Item} from '../../types/item';
import {Project} from '../../types/project';
import {ProjectOrder} from '../../types/projectOrder';
import {PurchaseDto} from '../../types/purchase';

export interface ITableConfigsSlicer {
    item: ITableDataConfig<Item>[];
    order: ITableDataConfig<ProjectOrder>[];
    purchase: ITableDataConfig<PurchaseDto>[];
    project: ITableDataConfig<Project>[];
    inventoryTrack: ITableDataConfig<InventoryTrackData>[];

}

type tableNamesType = keyof ITableConfigsSlicer;

const initialState = {
    item: itemTableDataConfigs,
    order: orderTableDataConfigs,
    purchase: purchaseTableDataConfigs,
    project: projectTableDataConfigs,
    inventoryTrack: inventoryTrackTableConfig
} as ITableConfigsSlicer;

const tableConfigsSlicer = createSlice({
    name: 'tableConfigs',
    initialState,
    reducers: {
        resetTable: (state, action: PayloadAction<{tableName: tableNamesType;}>) => {
            const defaultTableConfig = [...initialState[action.payload.tableName]];
            Object.assign(state, {[action.payload.tableName]: defaultTableConfig});
        },
        setNewTableConfigs: (state, action: PayloadAction<{tableName: tableNamesType; data: ITableConfigsSlicer[keyof ITableConfigsSlicer];}>) => {
            const newConfigs = action.payload.data;
            Object.assign(state, {[action.payload.tableName]: newConfigs});
        },
        resetAllTables: (state) => {
            Object.assign(state, initialState);
        }
    },
});

export const {resetTable, setNewTableConfigs, resetAllTables} = tableConfigsSlicer.actions;
export default tableConfigsSlicer.reducer;