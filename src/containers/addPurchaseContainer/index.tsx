import { memo, useEffect, useMemo, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { InputItem } from "../../components/inputItem/index.windows";
import { PrimaryButton } from "../../components/primaryButton";
import { RootState, useAppDispatch } from "../../modules/redux/store";
import HELP from "../../services/helpers";
import { Colors } from "../../utils/colors";
import ItemsForOrderListHeader from "./itemsPurchaseListHeader";
import { getStyle } from "./style";
import { useGetItemInputsQuery } from "../../modules/api/apiSlice";
import { AddPurchaseDto } from "../../types/purchase";
import { PurchaseStatus } from "../../enums/purchase";
import { clearPurchaseDataForPost, setIsPurchaseForEdit, setIsShowPurchaseModal, setPurchaseDataForPost } from "../../modules/redux/purchaseSlicer";
import ItemsForPurchaseList from "./itemsForPurchaseList";
import ItemsForPurchaseSearch from "./itemsForPurchaseSearch";
import { useAddPurchaseMutation, useEditPurchaseMutation } from "../../modules/api/purchase.api";
import AddEditItemModal from "../../views/warehouseView/components/addEditItemModal";



interface IAddPurchaseContainer {

}

const AddPurchaseContainer = ({ }: IAddPurchaseContainer) => {
    const style = useMemo(() => getStyle(), []);
    const dispatch = useAppDispatch();
    const [apiAddPurchase] = useAddPurchaseMutation();
    const [apiUpdatePurchase] = useEditPurchaseMutation();
    const { data: suppliersData, isLoading } = useGetItemInputsQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => ({
            data: data?.supplier,
            isLoading
        })
    });
    const isPurchaseForEdit = useSelector((state: RootState) => state.purchaseSlicer?.isPurchaseForedit);
    const purchaseData = useSelector((state: RootState) => state.purchaseSlicer.purchaseDataForPost);
    const [tempData, setTempData] = useState<AddPurchaseDto>();
    const purchaseStatus = useMemo(() => {
        return {
            confirmed: purchaseData.status === PurchaseStatus.CONFIRMED,
            rejected: purchaseData.status === PurchaseStatus.REJECTED,
            inProgress: purchaseData.status === PurchaseStatus.IN_PROGRESS
        };
    }, [purchaseData.status]);


    useEffect(() => {
        return () => {
            setTempData(undefined);
            dispatch(clearPurchaseDataForPost());
            dispatch(setIsShowPurchaseModal(false));
        };
    }, []);

    useEffect(() => {
        if (isPurchaseForEdit) {
            setTempData(purchaseData);
            dispatch(setIsPurchaseForEdit(false));
        }
    }, [isPurchaseForEdit]);


    const handleCreatePurchase = async () => {
        if (!!purchaseData.purchaseItems?.length) {
            const response = await apiAddPurchase(purchaseData);
            if (response?.data) {
                dispatch(setPurchaseDataForPost({ ...response.data }));
                setTempData({ ...response.data });
            }
        } else {
            HELP.alertError(undefined, `Cant Create Purchase`, `Purchase List is Empty`);
        }
    };

    const handleClearPurchaseData = () => {
        if (tempData) {
            dispatch(setPurchaseDataForPost(tempData));
        } else {
            dispatch(clearPurchaseDataForPost());
        }
    };

    const purchaseDetailSetValue = (value: string) => {
        dispatch(setPurchaseDataForPost({ detail: value }));
    };

    const handleUpdatePurchase = async () => {
        if (!!purchaseData.purchaseItems?.length) {
            const response = await apiUpdatePurchase({ body: purchaseData, id: purchaseData?.id! });
            if (response?.data) {
                dispatch(setPurchaseDataForPost({ ...response.data }));
                setTempData({ ...response.data });
            }
        } else {
            HELP.alertError(undefined, `Cant Update Purchase`, `Purchase List is Empty`);
        }
    };

    const handlePurchaseConfirm = async () => {
        const isPurchaseCanConfirmed = !!purchaseData?.purchaseItems?.length && !purchaseData.purchaseItems?.some(item => item.quantity === 0 || item.pricePerUnit === 0);
        if (isPurchaseCanConfirmed) {
            const response = await apiUpdatePurchase({ body: { ...purchaseData, status: PurchaseStatus.CONFIRMED }, id: purchaseData?.id! });
            if (response?.data) {
                dispatch(setPurchaseDataForPost({ ...response.data }));
                setTempData({ ...response.data });
            } else {

            }
        }
        else {
            HELP.alertError(undefined, `Can't Confirm!`, `List is empty or  some purchase Item quantity or price is 0"`);
        }
    };

    const handlePurchaseReject = async () => {
        if (!!purchaseData.purchaseItems?.length) {
            const response = await apiUpdatePurchase({ body: { ...purchaseData, status: PurchaseStatus.REJECTED }, id: purchaseData?.id! });
            if (response?.data) {
                dispatch(setPurchaseDataForPost({ ...response.data }));
                setTempData({ ...response.data });
            }
        } else {
            HELP.alertError(undefined, `Cant Reject`, `Purchase List  is empty`);
        }
    };


    const actionContainerColor = useMemo(() => {
        const colors = {
            [PurchaseStatus.CONFIRMED]: Colors.COMPLETED_COLOR,
            [PurchaseStatus.REJECTED]: Colors.DECLINED_COLOR,
            [PurchaseStatus.IN_PROGRESS]: Colors.INPROGRESS_COLOR
        };
        return purchaseData.status && colors[purchaseData.status];
    }, [PurchaseStatus]);

    const renderActionButtons = useMemo(() => {
        if (tempData) {
            return (
                <View style={style.orderActionButtonsContainer}>
                    {(!purchaseStatus.confirmed && !purchaseStatus.rejected)
                        &&
                        <PrimaryButton
                            onHoverOpacity
                            title={'CONFIRM'}
                            onPress={handlePurchaseConfirm}
                            width={100}
                            height={30}
                            borderRadius={2}
                            textColor={Colors.CARD_COLOR}
                            buttonColor={Colors.METALLIC_GOLD} />}
                    {(!purchaseStatus.rejected && purchaseStatus.confirmed)
                        &&
                        <PrimaryButton
                            onHoverOpacity
                            title={'REJECT'}
                            onPress={handlePurchaseReject}
                            width={100}
                            height={30}
                            borderRadius={2}
                            textColor={Colors.CARD_COLOR}
                            buttonColor={Colors.INFRA_RED} />}
                </View>
            );
        } else {
            return null;
        }
    }, [purchaseStatus, tempData]);




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
                        : <ItemsForPurchaseList
                            purchaseItems={purchaseData.purchaseItems ?? []}
                            suppliersData={suppliersData ?? []} />}
                </View>
            </View>
            <View style={[style.orderActionsContainer, { borderColor: actionContainerColor }]}>
                <Text style={style.orderStatusText}>
                    {`PURCHASE STATUS: ${purchaseData.status}`.toUpperCase()}
                </Text>
                {renderActionButtons}
            </View>
            <View style={style.orderDetailContainer}>
                <InputItem
                    inputTitle={'PURCHASE DETAIL'}
                    setValue={purchaseDetailSetValue}
                    inputValue={purchaseData.detail ?? ''}
                    isMultiLine
                    disabledForEdit={!purchaseStatus.inProgress}
                    height={60}
                />
            </View>
            <View style={style.orderFooterContainer}>
                {purchaseStatus.inProgress && <View style={style.orderFooterButtonContainer}>
                    <PrimaryButton onHoverOpacity title={'RESET'} onPress={handleClearPurchaseData} width={100} height={30} borderRadius={2} textColor={Colors.CARD_COLOR} buttonColor={Colors.DEFAULT_TEXT_COLOR} />
                    {tempData ? <PrimaryButton onHoverOpacity title={'UPDATE'} onPress={handleUpdatePurchase} width={100} height={30} borderRadius={2} textColor={Colors.CARD_COLOR} buttonColor={Colors.DEFAULT_TEXT_COLOR} />
                        : <PrimaryButton onHoverOpacity title={'CREATE'} onPress={handleCreatePurchase} width={100} height={30} borderRadius={2} textColor={Colors.CARD_COLOR} buttonColor={Colors.DEFAULT_TEXT_COLOR} />
                    }
                </View>}
            </View>
        </View>
    );
};

export default memo(AddPurchaseContainer);