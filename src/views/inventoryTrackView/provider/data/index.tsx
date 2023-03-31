import { useSelector } from "react-redux";
import { useGetTrackDataQuery } from "../../../../modules/api/inventoryTrack.api";
import { RootState } from "../../../../modules/redux/store";



function InventoryTrackDataProvider() {
    const queryParams = useSelector((state: RootState) => state.invventoryTrackQueryParams);
    const tableConfig = useSelector((state: RootState) => state.tableConfigs.inventoryTrack);
    const { data: queryData, isLoading } = useGetTrackDataQuery(queryParams, {
        selectFromResult: ({ data, isLoading, isUninitialized, error }) => ({
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

export default InventoryTrackDataProvider;