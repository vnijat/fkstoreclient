import { useEffect, useMemo, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useGetAllItemsQuery, useGetItemInputsQuery } from "../../../../modules/api/apiSlice";
import { selectFilterByForPicker, selectFilterbyForQuery, selectSelectedWithLabel } from "../../../../modules/redux/selectors/filterSelector";
import { RootState, useAppDispatch } from "../../../../modules/redux/store";
import HELP from "../../../../services/helpers";
import {setItemQueryParams} from "../../../../modules/redux/itemsSlicer";


function WareHouseDataProvider() {
    const dispatch = useAppDispatch();
    const wareHouseQueryParams = useSelector((state: RootState) => state.itemsSlicer.itemQueryParams);
    const wareHouseQueryFilterParams = useSelector(selectFilterbyForQuery, shallowEqual);
    const wareHouseTableConfigs = useSelector((state: RootState) => state.tableConfigs.item);
    const pickerFilterParams = useSelector(selectFilterByForPicker, shallowEqual);
    const selectedFilterParamsWithLabel = useSelector(selectSelectedWithLabel, shallowEqual);
    const isSomeParamSelected = useMemo(() => Object.values(pickerFilterParams).some((item) => item.length), [pickerFilterParams]);
    const { data: dataForFilterBy } = useGetItemInputsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            data
        }
        ),
        pollingInterval: 5000
    });
    const [isAlerted, setIsAlerted] = useState<boolean>(false);
    const { data: queryData, error: fetchError, isLoading } = useGetAllItemsQuery(wareHouseQueryParams, {
        selectFromResult: ({ data, isLoading, isUninitialized, error }) => ({
            data,
            error,
            isLoading: isUninitialized ? true : isLoading,
        }
        ),
        pollingInterval: 5000
    });

    useEffect(() => {
        dispatch(setItemQueryParams({ ...wareHouseQueryFilterParams, page: 1 }));
    }, [wareHouseQueryFilterParams]);

    useEffect(() => {
        if (fetchError && !isAlerted) {
            setIsAlerted(true);
            HELP.alertError(undefined, `${fetchError?.error}`, "Please check, is API correct",);
        } if (!fetchError) {
            setIsAlerted(false);
        }
    }, [fetchError, isAlerted]);

    return {
        wareHouseQueryParams,
        wareHouseQueryFilterParams,
        wareHouseTableConfigs,
        queryData: { data: queryData, isLoading },
        pickerFilterParams,
        selectedFilterParamsWithLabel,
        isSomeParamSelected,
        dataForFilterBy
    };

}

export default WareHouseDataProvider;