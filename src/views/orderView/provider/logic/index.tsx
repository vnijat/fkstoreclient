import {ITableDataConfig} from "../../../../containers/simpleTable/types";
import {OrderItemStatus} from "../../../../enums/orderItemStatus";
import {OrderStatus} from "../../../../enums/orderStatus";
import {OrdersApi, useAddOrderMutation, useDeleteOrderMutation, useEditOrderMutation} from "../../../../modules/api/orders.api";
import {addItemForOrder, clearOrderDataForPost, deleteItemFromOrder, setIsOrderForEdit, setIsShowOrderModal, setOrderDataForPost, setOrdersQueryParams, updateItemForOrder} from "../../../../modules/redux/orderSlicer";
import {useAppDispatch} from "../../../../modules/redux/store";
import {resetTable, setNewTableConfigs} from "../../../../modules/redux/tableConfigs";
import HELP from "../../../../services/helpers";
import {Imeta} from "../../../../types/common/common";
import {Item} from "../../../../types/item";
import {AddOrderDto, Order, ProjectOrder} from "../../../../types/projectOrder";


function OrderLogicProvider() {
    const dispatch = useAppDispatch();
    const [apiDeleteOrder] = useDeleteOrderMutation();
    const [apiAddOrder] = useAddOrderMutation();
    const [apiUpdateOrder] = useEditOrderMutation();

    function onResetTable() {
        dispatch(resetTable({tableName: 'order'}));
    }

    function onCloseModal() {
        dispatch(setIsShowOrderModal(false));
    }

    function setNewTableConfig(data: ITableDataConfig<ProjectOrder>[]) {
        dispatch(setNewTableConfigs({tableName: 'order', data}));
    }

    function onPressRowItem(data: ProjectOrder) {
        dispatch(setOrderDataForPost({...data}));
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

    function hanldeDeleteProductFromOrder(productId: number) {
        dispatch(deleteItemFromOrder({itemId: productId}));
    }

    function handdleCreateNewOrder() {
        dispatch(clearOrderDataForPost());
    }

    function handleUpdateProductInOrder(value: {data: {[key: string]: any;}, itemId: number;}) {
        dispatch(updateItemForOrder(value));
    }

    function handleSetOrderDataForPost(data: AddOrderDto) {
        dispatch(setOrderDataForPost(data));
    }

    async function addScannedProductToOrder(barcode: string) {
        const response = await dispatch(OrdersApi.endpoints.getItemForOrder.initiate(barcode, {forceRefetch: true}));
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
        if (response?.data) {
            dispatch(setOrderDataForPost({...response?.data}));
            HELP.showToast('success', 'New Order Created');
        }
    }

    async function handleUpdateOrder(data: AddOrderDto) {
        try {
            const {orderItems} = data;
            const isOrderConfirmed = data.status === OrderStatus.COMPLETED;
            const isOrderRejected = data.status === OrderStatus.DECLINED;
            const isSomeProductStatusIsNotSet = orderItems?.some((item) => item.status === OrderItemStatus.IN_USE);
            if (isOrderConfirmed && isSomeProductStatusIsNotSet) {
                HELP.showToast('info', 'Some Product Status is not set');
            } else {
                const response = await apiUpdateOrder({id: data.id!, body: data}).unwrap();
                if (response.data) {
                    dispatch(setOrderDataForPost({...response?.data}));
                }
                HELP.showToast('success', 'Order Updated');
            }
        } catch (error) {
            HELP.alertError(error);
        }

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
        handleUpdateOrder,
        hanldeDeleteProductFromOrder
    };

};



export default OrderLogicProvider;