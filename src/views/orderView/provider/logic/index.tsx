import { ITableDataConfig } from "../../../../containers/simpleTable/types";
import { OrdersApi, useAddOrderMutation, useDeleteOrderMutation } from "../../../../modules/api/orders.api";
import { setOrdersQueryParams } from "../../../../modules/redux/orderQuerySlicer";
import { addItemForOrder, clearOrderDataForPost, setIsOrderForEdit, setIsShowOrderModal, setOrderDataForPost, updateItemForOrder } from "../../../../modules/redux/orderSlicer";
import { useAppDispatch } from "../../../../modules/redux/store";
import { resetTable, setNewTableConfigs } from "../../../../modules/redux/tableConfigs";
import HELP from "../../../../services/helpers";
import { Imeta } from "../../../../types/common/common";
import { Item } from "../../../../types/item";
import { AddOrderDto, Order, ProjectOrder } from "../../../../types/projectOrder";



function OrderLogicProvider() {
    const dispatch = useAppDispatch();
    const [apiDeleteOrder] = useDeleteOrderMutation();
    const [apiAddOrder] = useAddOrderMutation();


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

    function handleAddProductForOrder(product: Item) {
        dispatch(addItemForOrder(product));
    }

    function handdleCreateNewOrder() {
        dispatch(clearOrderDataForPost());
    }

    function handleUpdateProductInOrder(value: { data: { [key: string]: any; }, itemId: number; }) {
        dispatch(updateItemForOrder(value));
    }

    function handleSetOrderDataForPost(data: AddOrderDto) {
        dispatch(setOrderDataForPost(data));
    }

    async function addScannedProductToOrder(barcode: string) {
        const response = await dispatch(OrdersApi.endpoints.itemForOrder.initiate(barcode, { forceRefetch: true }));
        if (response.data?.length === 1) {
            const productForOrder = response.data[0];
            dispatch(addItemForOrder(productForOrder));
            HELP.showToast('success', `Product ${barcode} added to Order`, `${productForOrder.name}`);
        } else {
            HELP.showToast('info', `${barcode}  not found or out of stock`, 'NOT FOUND');
        }
    }

    async function handlePostNewOrderData(data: AddOrderDto) {
        const response = await apiAddOrder(data);
        console.log("response===>>", response);
    }

    async function handleUpdateOrder(data: AddOrderDto) {

    }



    return {
        onPressRowItem,
        onResetTable,
        onCloseModal,
        setNewTableConfig,
        handleOndeleteOrder,
        handlePagination,
        handleAddProductForOrder,
        handdleCreateNewOrder,
        handleUpdateProductInOrder,
        handleSetOrderDataForPost,
        addScannedProductToOrder,
        handlePostNewOrderData,
        handleUpdateOrder
    };

};



export default OrderLogicProvider;