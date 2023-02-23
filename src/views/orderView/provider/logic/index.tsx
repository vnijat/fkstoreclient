import { ITableDataConfig } from "../../../../containers/simpleTable/types";
import { useDeleteOrderMutation } from "../../../../modules/api/orders.api";
import { setOrdersQueryParams } from "../../../../modules/redux/orderQuerySlicer";
import { setIsOrderForEdit, setIsShowOrderModal, setOrderDataForPost } from "../../../../modules/redux/orderSlicer";
import { useAppDispatch } from "../../../../modules/redux/store";
import { resetTable, setNewTableConfigs } from "../../../../modules/redux/tableConfigs";
import HELP from "../../../../services/helpers";
import { Imeta } from "../../../../types/common/common";
import { ProjectOrder } from "../../../../types/projectOrder";



function OrderLogicProvider() {
    const dispatch = useAppDispatch();
    const [apiDeleteOrder] = useDeleteOrderMutation();



    function onResetTable() {
        dispatch(resetTable({ tableName: 'order' }));
    }


    function onCloseModal() {
        dispatch(setIsShowOrderModal(false));
    }


    function setNewTableConfig(data: ITableDataConfig<ProjectOrder>[]) {
        dispatch(setNewTableConfigs({ tableName: 'order', data }));
    }



    function onPressRowItem(data: ProjectOrder) {
        dispatch(setOrderDataForPost({ ...data }));
        dispatch(setIsOrderForEdit(true));
        dispatch(setIsShowOrderModal(true));

    }

    async function deleteOrder(orderId: number): Promise<void> {
        try {
            const response = await apiDeleteOrder(orderId);
            if (response.error) {
                throw response.error;
            }
        } catch (error) {
            if (error?.data?.message) {
                HELP.alertError(error);
            }
        }
    };


    function handlePagination(data: Imeta) {
        dispatch(setOrdersQueryParams(data));
    }


    async function handleOndeleteOrder(data: ProjectOrder) {
        await deleteOrder(data.id!);

    }



    return {
        onPressRowItem,
        onResetTable,
        onCloseModal,
        setNewTableConfig,
        handleOndeleteOrder,
        handlePagination
    };

};



export default OrderLogicProvider;