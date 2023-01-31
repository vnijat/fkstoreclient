import { memo, useEffect, useMemo, useState } from "react";
import { Text, View, ActivityIndicator, Alert } from "react-native";
import { useSelector } from "react-redux";
import { InputItem } from "../../components/inputItem/index.windows";
import { PrimaryButton } from "../../components/primaryButton";
import { OrderItemStatus } from "../../enums/orderItemStatus";
import { OrderStatus } from "../../enums/orderStatus";
import { useAddOrderMutation, useEditOrderMutation } from "../../modules/api/orders.api";
import { useGetProjectsForPickerQuery } from "../../modules/api/projects.api";
import { clearOrderDataForPost, setIsOrderForEdit, setIsShowOrderModal, setOrderDataForPost } from "../../modules/redux/orderSlicer";
import { RootState, useAppDispatch } from "../../modules/redux/store";
import HELP from "../../services/helpers";
import { AddOrderDto } from "../../types/projectOrder";
import { Colors } from "../../utils/colors";
import ItemsForOrderList from "./itemsForOrderList";
import ItemsForOrderListHeader from "./itemsForOrderListHeader";
import ItemsForOrderSearch from "./itemsForOrderSearch";
import { getStyle } from "./style";



interface IAddOrderContainer {

}

const AddOrderCntainer = ({ }: IAddOrderContainer) => {
    const style = useMemo(() => getStyle(), []);
    const dispatch = useAppDispatch();
    const [apiAddOrder] = useAddOrderMutation();
    const [apiUpdateOrder] = useEditOrderMutation();
    const { data: projectsData, isLoading } = useGetProjectsForPickerQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => ({
            data,
            isLoading
        })
    });
    const isOrderForEdit = useSelector((state: RootState) => state.ordersSlicer?.isOrderForEdit);
    const orderData = useSelector((state: RootState) => state.ordersSlicer.orderDataForPost);
    const [tempOrderData, setTempOrderData] = useState<AddOrderDto>();
    const orderStatus = useMemo(() => {
        return {
            confirmed: orderData.status === OrderStatus.COMPLETED,
            rejected: orderData.status === OrderStatus.DECLINED,
            inProgress: orderData.status === OrderStatus.PENDING
        };
    }, [orderData.status]);

    useEffect(() => {
        return () => {
            setTempOrderData(undefined);
            dispatch(clearOrderDataForPost());
            dispatch(setIsShowOrderModal(false));
        };
    }, []);

    useEffect(() => {
        if (isOrderForEdit) {
            setTempOrderData(orderData);
            dispatch(setIsOrderForEdit(false));
        }
    }, [isOrderForEdit]);


    const handleCreateOrder = async () => {
        if (!!orderData.orderItems?.length) {
            const response = await apiAddOrder(orderData);
            if (response?.data) {
                dispatch(setOrderDataForPost({ ...response.data }));
                setTempOrderData({ ...response.data });
            }
        } else {
            HELP.alertError(undefined, `Cant Create Order`, `Order Cart is Empty`);
        }
    };
    const handleClearOrderData = () => {
        if (tempOrderData) {
            dispatch(setOrderDataForPost(tempOrderData));
        } else {
            dispatch(clearOrderDataForPost());
        }
    };

    const orderDetailSetValue = (value: string) => {
        dispatch(setOrderDataForPost({ detail: value }));
    };

    const handleUpdateOrder = async () => {
        if (!!orderData.orderItems?.length) {
            const response = await apiUpdateOrder({ body: orderData, id: orderData?.id! });
            if (response?.data) {
                dispatch(setOrderDataForPost({ ...response.data }));
                setTempOrderData({ ...response.data });
            }
        } else {
            HELP.alertError(undefined, `Cant Update Order`, `Order Cart is Empty`);
        }
    };


    const handleOrderConfirm = async () => {
        const isOrderCanConfirmed = !!orderData?.orderItems?.length && !orderData.orderItems?.some(item => [OrderItemStatus.IN_USE].includes(item.status!));
        if (isOrderCanConfirmed) {
            const response = await apiUpdateOrder({ body: { ...orderData, status: OrderStatus.COMPLETED }, id: orderData?.id! });
            if (response?.data) {
                dispatch(setOrderDataForPost({ ...response.data }));
                setTempOrderData({ ...response.data });
            } else {

            }
        }
        else {
            HELP.alertError(undefined, `Can't Confirm!`, `cart empty or  some item status is"${OrderItemStatus.IN_USE.toUpperCase()}"`);
        }

    };

    const handleOrderReject = async () => {
        if (!!orderData.orderItems?.length) {
            const response = await apiUpdateOrder({ body: { ...orderData, status: OrderStatus.DECLINED }, id: orderData?.id! });
            if (response?.data) {
                dispatch(setOrderDataForPost({ ...response.data }));
                setTempOrderData({ ...response.data });
            } else if (response?.error) {
                HELP.alertError(response?.error);
            }
        } else {
            HELP.alertError(undefined, `Cant Reject`, `Order cart is empty`);
        }
    };

    const actionContainerColor = useMemo(() => {
        const colors = {
            [OrderStatus.COMPLETED]: Colors.COMPLETED_COLOR,
            [OrderStatus.DECLINED]: Colors.DECLINED_COLOR,
            [OrderStatus.PENDING]: Colors.INPROGRESS_COLOR
        };
        return orderData.status && colors[orderData.status];
    }, [orderStatus]);

    return (
        <View style={style.container}>
            {orderStatus.inProgress && <View style={style.searchContainer}>
                <ItemsForOrderSearch />
            </View>}
            <View style={style.orderContentContainer}>
                <View style={style.orderListHeaderContainer}>
                    <ItemsForOrderListHeader />
                </View>
                <View style={style.orderListContainer}>
                    {isLoading ? <ActivityIndicator size={'large'} color={Colors.METALLIC_GOLD} />
                        : <ItemsForOrderList orderItems={orderData.orderItems ?? []} projectsData={projectsData ?? []} />}
                </View>
            </View>
            <View style={[style.orderActionsContainer, { borderColor: actionContainerColor }]}>
                <Text style={style.orderStatusText}>
                    {`ORDER STATUS: ${orderData.status}`.toUpperCase()}
                </Text>
                {tempOrderData && <View style={style.orderActionButtonsContainer}>
                    {(!orderStatus.confirmed && !orderStatus.rejected) && <PrimaryButton onHoverOpacity title={'CONFIRM'} onPress={handleOrderConfirm} width={100} height={30} borderRadius={2} textColor={Colors.CARD_COLOR} buttonColor={Colors.METALLIC_GOLD} />}
                    {(!orderStatus.rejected && orderStatus.confirmed) && <PrimaryButton onHoverOpacity title={'REJECT'} onPress={handleOrderReject} width={100} height={30} borderRadius={2} textColor={Colors.CARD_COLOR} buttonColor={Colors.INFRA_RED} />}
                </View>}
            </View>
            <View style={style.orderDetailContainer}>
                <InputItem
                    inputTitle={'ORDER DETAIL'}
                    setValue={orderDetailSetValue}
                    inputValue={orderData.detail ?? ''}
                    isMultiLine
                    disabledForEdit={!orderStatus.inProgress}
                    height={60}
                />
            </View>
            <View style={style.orderFooterContainer}>
                {orderStatus.inProgress && <View style={style.orderFooterButtonContainer}>
                    <PrimaryButton onHoverOpacity title={'RESET'} onPress={handleClearOrderData} width={100} height={30} borderRadius={2} textColor={Colors.CARD_COLOR} buttonColor={Colors.DEFAULT_TEXT_COLOR} />
                    {tempOrderData ? <PrimaryButton onHoverOpacity title={'UPDATE'} onPress={handleUpdateOrder} width={100} height={30} borderRadius={2} textColor={Colors.CARD_COLOR} buttonColor={Colors.DEFAULT_TEXT_COLOR} />
                        : <PrimaryButton onHoverOpacity title={'CREATE'} onPress={handleCreateOrder} width={100} height={30} borderRadius={2} textColor={Colors.CARD_COLOR} buttonColor={Colors.DEFAULT_TEXT_COLOR} />
                    }
                </View>}
            </View>
        </View>
    );
};

export default memo(AddOrderCntainer);