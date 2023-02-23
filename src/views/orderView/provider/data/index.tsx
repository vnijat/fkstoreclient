import { useSelector } from "react-redux";
import { useDeleteOrderMutation, useGetOrdersQuery } from "../../../../modules/api/orders.api";
import { RootState } from "../../../../modules/redux/store";


function OrderDataProvider() {
    const isShowOrderModal = useSelector((state: RootState) => state.ordersSlicer.isShowOrderModal);
    const ordersQueryParams = useSelector((state: RootState) => state.ordersQueryParams);
    const tableConfigs = useSelector((state: RootState) => state.tableConfigs.order);
    const { data: queryData, isLoading } = useGetOrdersQuery(ordersQueryParams, {
        selectFromResult: ({ data, isLoading, isUninitialized, error }) => ({
            data,
            isLoading: isUninitialized ? true : isLoading
        }
        ),
        pollingInterval: 5000
    });



    return {
        queryData: { data: queryData, isLoading },
        tableConfigs,
        ordersQueryParams,
        isShowOrderModal,
    };
}


export default OrderDataProvider;