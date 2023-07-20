import {useSelector} from "react-redux";
import {InventoryApi} from "../../../../modules/api/apiSlice";
import {OrdersApi, useDeleteOrderMutation, useGetOrdersQuery, useItemForOrderQuery} from "../../../../modules/api/orders.api";
import {useGetProjectsForPickerQuery} from "../../../../modules/api/projects.api";
import {RootState, useAppDispatch} from "../../../../modules/redux/store";
import HELP from "../../../../services/helpers";
import {Item} from "../../../../types/item";


function OrderDataProvider() {
    const dispatch = useAppDispatch();
    const isShowOrderModal = useSelector((state: RootState) => state.ordersSlicer.isShowOrderModal);
    const ordersQueryParams = useSelector((state: RootState) => state.ordersQueryParams);
    const tableConfigs = useSelector((state: RootState) => state.tableConfigs.order);
    const orderDataForPost = useSelector((state: RootState) => state.ordersSlicer.orderDataForPost);
    const {data: projectsForPicker} = useGetProjectsForPickerQuery(undefined, {
        selectFromResult: ({data, isLoading}) => ({
            data,
        }),
        pollingInterval: 5000,
    });
    const {data: queryData, isLoading} = useGetOrdersQuery(ordersQueryParams, {
        selectFromResult: ({data, isLoading, isUninitialized, error}) => ({
            data,
            isLoading: isUninitialized ? true : isLoading
        }
        ),
        pollingInterval: 5000
    });

    async function searchProductForOrder(searchValue: string) {
        let data: Item[] = [];
        if (searchValue) {
            const response = await dispatch(OrdersApi.endpoints.itemForOrder.initiate(searchValue, {forceRefetch: true}));
            if (response.isError) {
                HELP.alertError(undefined, 'Search Error');
            } else {
                data = response.data!;
            }
        }
        return data;
    }


    return {
        queryData: {data: queryData, isLoading},
        tableConfigs,
        ordersQueryParams,
        isShowOrderModal,
        searchProductForOrder,
        orderDataForPost,
        projectsForPicker,
    };
}


export default OrderDataProvider;