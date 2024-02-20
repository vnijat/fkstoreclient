import {ITableDataConfig} from "../../../../containers/simpleTable/types";
import {setInventoryTrackQueryParams} from "../../../../modules/redux/inventorySlicer";
import {RootState, useAppDispatch} from "../../../../modules/redux/store";
import {resetTable, setNewTableConfigs} from "../../../../modules/redux/tableConfigs";
import {Imeta} from "../../../../types/common/common";
import {InventoryTrackData, InventoryTransfers} from "../../../../types/inventory";



function InventoryTransfersLogicProvider() {
    const dispatch = useAppDispatch();

    function handleDateChange(data: {startDate: string, endDate: string;}) {
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
        dispatch(setInventoryTrackQueryParams({page: 1, search: value}));

    }

    function handleNewTableData(data: ITableDataConfig<InventoryTransfers>[]) {
        dispatch(setNewTableConfigs({tableName: 'inventoryTransfers', data}));
    }

    function handleResetTableConfig() {
        dispatch(resetTable({tableName: 'inventoryTransfers'}));
    }


    return {
        handlePagination,
        handleNewTableData,
        handleResetTableConfig,
        handleSearchInput,
        handleDateChange
    };


}

export default InventoryTransfersLogicProvider;