import { useSelector } from "react-redux";
import { useGetPurchasesQuery } from "../../../../modules/api/purchase.api";
import { RootState } from "../../../../modules/redux/store";





function PurchaseDataProvider() {
    const purchaseTableConfigs = useSelector((state: RootState) => state.tableConfigs.purchase);
    const purchaseQueryParams = useSelector((state: RootState) => state.purchaseQueryParams);
    const { data: queryData, isLoading } = useGetPurchasesQuery(purchaseQueryParams, {
        selectFromResult: ({ data, isLoading, isUninitialized, error }) => ({
            data,
            isLoading: isUninitialized ? true : isLoading,
        }
        ),
        pollingInterval: 5000
    });
    const isPurchaseModalOpen = useSelector((state: RootState) => state.purchaseSlicer.isShowPurchaseModal);

    return {
        queryData: { data: queryData, isLoading },
        isPurchaseModalOpen,
        purchaseQueryParams,
        purchaseTableConfigs
    };
}

export default PurchaseDataProvider;