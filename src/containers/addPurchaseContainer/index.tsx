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
import ItemsForOrderList from "./itemsForPurchaseList";
import ItemsForOrderListHeader from "./itemsPurchaseListHeader";
import ItemsForOrderSearch from "./itemsForPurchaseSearch";
import { getStyle } from "./style";
import { useGetOptionQuery } from "../../modules/api/itemOptions.api";
import { useGetItemInputsQuery } from "../../modules/api/apiSlice";
import { AddPurchaseDto } from "../../types/purchase";
import { PurchaseStatus } from "../../enums/purchase";
import { clearPurchaseDataForPost, setIsPurchaseForEdit, setIsShowPurchaseModal } from "../../modules/redux/purchaseSlicer";
import ItemsForPurchaseList from "./itemsForPurchaseList";
import ItemsForPurchaseSearch from "./itemsForPurchaseSearch";



interface IAddPurchaseContainer {

}

const AddPurchaseContainer = ({ }: IAddPurchaseContainer) => {
    const style = useMemo(() => getStyle(), []);
    const dispatch = useAppDispatch();
    // const [apiAddOrder] = useAddOrderMutation();
    // const [apiUpdateOrder] = useEditOrderMutation();
    const { data: suppliersData, isLoading } = useGetItemInputsQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => ({
            data: data?.supplier,
            isLoading
        })
    });
    const isPurchaseForEdit = useSelector((state: RootState) => state.purchaseSlicer?.isPurchaseForedit);
    const purchaseData = useSelector((state: RootState) => state.purchaseSlicer.purchaseDataForPost);
    const [tempOrderData, setTempOrderData] = useState<AddPurchaseDto>();
    const purchaseStatus = useMemo(() => {
        return {
            confirmed: purchaseData.status === PurchaseStatus.CONFIRMED,
            rejected: purchaseData.status === PurchaseStatus.REJECTED,
            inProgress: purchaseData.status === PurchaseStatus.IN_PROGRESS
        };
    }, [purchaseData.status]);

    useEffect(() => {
        return () => {
            setTempOrderData(undefined);
            dispatch(clearPurchaseDataForPost());
            dispatch(setIsShowPurchaseModal(false));
        };
    }, []);

    useEffect(() => {
        if (isPurchaseForEdit) {
            setTempOrderData(purchaseData);
            dispatch(setIsPurchaseForEdit(false));
        }
    }, [isPurchaseForEdit]);


    const handleCreateOrder = async () => {
        if (!!purchaseData.purchaseItems?.length) {
            // const response = await apiAddOrder(orderData);
            if (response?.data) {
                // dispatch(setOrderDataForPost({ ...response.data }));
                // setTempOrderData({ ...response.data });
            }
        } else {
            // HELP.alertError(undefined, `Cant Create Order`, `Order Cart is Empty`);
        }
    };

    const handleClearOrderData = () => {
        // if (tempOrderData) {
        //     dispatch(setOrderDataForPost(tempOrderData));
        // } else {
        //     dispatch(clearOrderDataForPost());
        // }
    };

    const orderDetailSetValue = (value: string) => {
        dispatch(setOrderDataForPost({ detail: value }));
    };

    const handleUpdateOrder = async () => {
        if (!!purchaseData.purchaseItems?.length) {
            // const response = await apiUpdateOrder({ body: orderData, id: orderData?.id! });
            if (response?.data) {
                // dispatch(setOrderDataForPost({ ...response.data }));
                // setTempOrderData({ ...response.data });
            }
        } else {
            // HELP.alertError(undefined, `Cant Update Order`, `Order Cart is Empty`);
        }
    };


    const handlePurchaseConfirm = async () => {

    };

    const handlePurchaseReject = async () => {

    };

    const actionContainerColor = useMemo(() => {
        const colors = {
            [PurchaseStatus.CONFIRMED]: Colors.COMPLETED_COLOR,
            [PurchaseStatus.REJECTED]: Colors.DECLINED_COLOR,
            [PurchaseStatus.IN_PROGRESS]: Colors.INPROGRESS_COLOR
        };
        return purchaseData.status && colors[purchaseData.status];
    }, [PurchaseStatus]);

    return (
        <View style={style.container}>
            {purchaseStatus.inProgress && <View style={style.searchContainer}>
                <ItemsForPurchaseSearch />
            </View>}
            <View style={style.orderContentContainer}>
                <View style={style.orderListHeaderContainer}>
                    <ItemsForOrderListHeader />
                </View>
                <View style={style.orderListContainer}>
                    {isLoading ? <ActivityIndicator size={'large'} color={Colors.METALLIC_GOLD} />
                        : <ItemsForPurchaseList purchaseItems={purchaseData.purchaseItems ?? []} suppliersData={suppliersData ?? []} />}
                </View>
            </View>
            <View style={[style.orderActionsContainer, { borderColor: actionContainerColor }]}>
                <Text style={style.orderStatusText}>
                    {`PURCHASE STATUS: ${purchaseData.status}`.toUpperCase()}
                </Text>
                {tempOrderData && <View style={style.orderActionButtonsContainer}>
                    {(!purchaseStatus.confirmed && !purchaseStatus.rejected) && <PrimaryButton onHoverOpacity title={'CONFIRM'} onPress={handlePurchaseConfirm} width={100} height={30} borderRadius={2} textColor={Colors.CARD_COLOR} buttonColor={Colors.METALLIC_GOLD} />}
                    {(!purchaseStatus.rejected && purchaseStatus.confirmed) && <PrimaryButton onHoverOpacity title={'REJECT'} onPress={handlePurchaseReject} width={100} height={30} borderRadius={2} textColor={Colors.CARD_COLOR} buttonColor={Colors.INFRA_RED} />}
                </View>}
            </View>
            <View style={style.orderDetailContainer}>
                <InputItem
                    inputTitle={'PURCHASE DETAIL'}
                    setValue={orderDetailSetValue}
                    inputValue={purchaseData.detail ?? ''}
                    isMultiLine
                    disabledForEdit={!purchaseStatus.inProgress}
                    height={60}
                />
            </View>
            <View style={style.orderFooterContainer}>
                {purchaseStatus.inProgress && <View style={style.orderFooterButtonContainer}>
                    <PrimaryButton onHoverOpacity title={'RESET'} onPress={handleClearOrderData} width={100} height={30} borderRadius={2} textColor={Colors.CARD_COLOR} buttonColor={Colors.DEFAULT_TEXT_COLOR} />
                    {tempOrderData ? <PrimaryButton onHoverOpacity title={'UPDATE'} onPress={handleUpdateOrder} width={100} height={30} borderRadius={2} textColor={Colors.CARD_COLOR} buttonColor={Colors.DEFAULT_TEXT_COLOR} />
                        : <PrimaryButton onHoverOpacity title={'CREATE'} onPress={handleCreateOrder} width={100} height={30} borderRadius={2} textColor={Colors.CARD_COLOR} buttonColor={Colors.DEFAULT_TEXT_COLOR} />
                    }
                </View>}
            </View>
        </View>
    );
};

export default memo(AddPurchaseContainer);