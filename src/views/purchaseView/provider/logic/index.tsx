import { ITableDataConfig } from "../../../../containers/simpleTable/types";
import { useDeletePurchaseMutation } from "../../../../modules/api/purchase.api";
import { setPurchaseQueryParams } from "../../../../modules/redux/purchaseQuerySlicer";
import { setIsPurchaseForEdit, setIsShowPurchaseModal, setPurchaseDataForPost } from "../../../../modules/redux/purchaseSlicer";
import { useAppDispatch } from "../../../../modules/redux/store";
import { resetTable, setNewTableConfigs } from "../../../../modules/redux/tableConfigs";
import HELP from "../../../../services/helpers";
import { Imeta } from "../../../../types/common/common";
import { PurchaseDto } from "../../../../types/purchase";





function PurchaseLogicProvider() {
    const dispatch = useAppDispatch();
    const [apiDeletePurchase] = useDeletePurchaseMutation();

    function onClosePurchaseModal() {
        dispatch(setIsShowPurchaseModal(false));
    }

    function handlePagination(data: Imeta) {
        dispatch(setPurchaseQueryParams(data));
    }

    function handleSearchInput(value: string) {
        dispatch(setPurchaseQueryParams({ page: 1, search: value }));
    }

    function onPressAddPurchase() {
        dispatch(setIsShowPurchaseModal(true));
    }

    async function handlePurchaseDelete(purchaseId: number) {
        try {
            const response = await apiDeletePurchase(purchaseId);
            if (response.error) {
                throw response.error;
            }
        } catch (error) {
            if (error?.data?.message) {
                HELP.alertError(error);
            }
        }
    }

    function handleOnPressRow(data: PurchaseDto) {
        dispatch(setPurchaseDataForPost({ ...data }));
        dispatch(setIsPurchaseForEdit(true));
        dispatch(setIsShowPurchaseModal(true));
    }

    function handleNewTableConfigs(data: ITableDataConfig<PurchaseDto>[]) {
        dispatch(setNewTableConfigs({ tableName: 'purchase', data }));
    }

    function handleResetTableConfigs() {
        dispatch(resetTable({ tableName: 'purchase' }));
    }

    return {
        onClosePurchaseModal,
        onPressAddPurchase,
        handlePagination,
        handleSearchInput,
        handlePurchaseDelete,
        handleOnPressRow,
        handleNewTableConfigs,
        handleResetTableConfigs
    };
}

export default PurchaseLogicProvider;