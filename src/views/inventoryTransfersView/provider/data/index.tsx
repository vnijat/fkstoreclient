import {useSelector} from "react-redux";
import {useGetTrackDataQuery, useGetTransfersDataQuery} from "../../../../modules/api/inventoryTrack.api";
import {RootState} from "../../../../modules/redux/store";



function InventoryTransfersDataProvider() {
    const queryParams = useSelector((state: RootState) => state.inventorySlicer.inventoryTransfersParams);
    const tableConfig = useSelector((state: RootState) => state.tableConfigs.inventoryTransfers);
    const {data: queryData, isLoading} = useGetTransfersDataQuery(queryParams, {
        selectFromResult: ({data, isLoading, isUninitialized, error}) => ({
            data,
            isLoading: isUninitialized ? true : isLoading
        }
        ),
        pollingInterval: 5000
    });
    return {
        queryData: {
            data: queryData,
            isLoading
        },
        tableConfig,
        queryParams
    };


}

export default InventoryTransfersDataProvider;