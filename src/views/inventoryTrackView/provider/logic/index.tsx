import { ITableDataConfig } from "../../../../containers/simpleTable/types";
import {setInventoryTrackQueryParams} from "../../../../modules/redux/inventorySlicer";
import { RootState, useAppDispatch } from "../../../../modules/redux/store";
import { resetTable, setNewTableConfigs } from "../../../../modules/redux/tableConfigs";
import { Imeta } from "../../../../types/common/common";
import { InventoryTrackData } from "../../../../types/inventory";



function InventoryTrackLogicProvider() {
    const dispatch = useAppDispatch();

    function handleDateChange(data: { startDate: string, endDate: string; }) {
        dispatch(setInventoryTrackQueryParams({
            startDate: data.startDate,
            endDate: data.endDate,
            page: 1
        }));

    }

    function handlePagination(data: Imeta) {
        dispatch(setInventoryTrackQueryParams(data));
    }

    function handleSearchInput(value: string) {
        dispatch(setInventoryTrackQueryParams({ page: 1, search: value }));

    }

    function handleNewTableData(data: ITableDataConfig<InventoryTrackData>[]) {
        dispatch(setNewTableConfigs({ tableName: 'inventoryTrack', data }));
    }

    function handleResetTableConfig() {
        dispatch(resetTable({ tableName: 'inventoryTrack' }));
    }


    return {
        handlePagination,
        handleNewTableData,
        handleResetTableConfig,
        handleSearchInput,
        handleDateChange
    };


}

export default InventoryTrackLogicProvider;