import { memo, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { InputItem } from "../../components/inputItem/index.windows";
import { PrimaryButton } from "../../components/primaryButton";
import { useAddOrderMutation, useEditOrderMutation } from "../../modules/api/orders.api";
import { clearOrderDataForPost, setIsOrderForEdit, setIsShowOrderModal, setOrderDataForPost } from "../../modules/redux/orderSlicer";
import { RootState, useAppDispatch } from "../../modules/redux/store";
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
    const isOrderForEdit = useSelector((state: RootState) => state.ordersSlicer?.isOrderForEdit);
    const orderData = useSelector((state: RootState) => state.ordersSlicer.orderDataForPost);
    const [tempOrderData, setTempOrderData] = useState<AddOrderDto>();

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


    const handleCreateOrder = () => {
        apiAddOrder(orderData);
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

    const handleUpdateOrder = () => {
        apiUpdateOrder({ body: orderData, id: orderData?.id! });
        setTempOrderData(orderData);
    };


    return (
        <View style={style.container}>
            <View style={style.searchContainer}>
                <ItemsForOrderSearch />
            </View>
            <View style={style.orderContentContainer}>
                <View style={style.orderListHeaderContainer}>
                    <ItemsForOrderListHeader />
                </View>
                <View style={style.orderListContainer}>
                    <ItemsForOrderList orderItems={orderData.orderItems ?? []} />
                </View>
            </View>
            <View style={style.orderDetailContainer}>
                <InputItem
                    inputTitle={'ORDER DETAIL'}
                    setValue={orderDetailSetValue}
                    inputValue={orderData.detail ?? ''}
                    isMultiLine
                    height={60}
                />
            </View>
            <View style={style.orderFooterContainer}>
                <View style={style.orderFooterButtonContainer}>
                    <PrimaryButton onHoverOpacity title={'Reset'} onPress={handleClearOrderData} width={100} height={30} borderRadius={2} textColor={Colors.CARD_COLOR} buttonColor={Colors.DEFAULT_TEXT_COLOR} />
                    {tempOrderData ? <PrimaryButton onHoverOpacity title={'Update Order'} onPress={handleUpdateOrder} width={100} height={30} borderRadius={2} textColor={Colors.CARD_COLOR} buttonColor={Colors.DEFAULT_TEXT_COLOR} />
                        : <PrimaryButton onHoverOpacity title={'Create Order'} onPress={handleCreateOrder} width={100} height={30} borderRadius={2} textColor={Colors.CARD_COLOR} buttonColor={Colors.DEFAULT_TEXT_COLOR} />
                    }
                </View>
            </View>
        </View>
    );
};

export default memo(AddOrderCntainer);