import {ITableDataConfig} from "../../../../containers/simpleTable/types";
import {setInventoryTrackQueryParams, setInventoryTransfersParams, setIsShowTransferAddModal} from "../../../../modules/redux/inventorySlicer";
import {RootState, useAppDispatch} from "../../../../modules/redux/store";
import {resetTable, setNewTableConfigs} from "../../../../modules/redux/tableConfigs";
import {Imeta} from "../../../../types/common/common";
import {InventoryTrackData, InventoryTransfers} from "../../../../types/inventory";



function InventoryTransfersLogicProvider() {
    const dispatch = useAppDispatch();

    function handleDateChange(data: {startDate: string, endDate: string;}) {
        dispatch(setInventoryTransfersParams({
            startDate: data.startDate,
            endDate: data.endDate,
            page: 1
        }));

    }

    function handlePagination(data: Imeta) {
        dispatch(setInventoryTransfersParams(data));
    }

    function handleSearchInput(value: string) {
        dispatch(setInventoryTransfersParams({page: 1, search: value}));

    }

    function handleShowTransferAddModal() {
        dispatch(setIsShowTransferAddModal(true));
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
        handleDateChange,
        handleShowTransferAddModal
    };


}

export default InventoryTransfersLogicProvider;