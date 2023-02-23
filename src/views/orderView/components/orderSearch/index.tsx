import React, { memo, useMemo, useState } from "react";
import { View } from "react-native";
import { InputItem } from "../../../../components/inputItem/index.windows";
import { PrimaryButton } from "../../../../components/primaryButton";
import { setOrdersQueryParams } from "../../../../modules/redux/orderQuerySlicer";
import { setIsShowOrderModal } from "../../../../modules/redux/orderSlicer";
import { useAppDispatch } from "../../../../modules/redux/store";
import { Colors } from "../../../../utils/colors";
import { getStyle } from "./styles";



interface IOrderSearchContainer {
    searchValue: string;




}


const OrderSearchContainer = ({ searchValue }: IOrderSearchContainer) => {
    const style = useMemo(() => getStyle(), []);
    const dispatch = useAppDispatch();

    const setSearchValue = (text: string) => {
        dispatch(setOrdersQueryParams({ page: 1, search: text }));
    };

    const onPressAddOrder = () => {
        dispatch(setIsShowOrderModal(true));
    };

    return (
        <>
            <View style={{ flexGrow: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.CARD_COLOR, paddingHorizontal: 10, paddingVertical: 10 }}>
                <View style={{ flex: 0.4, justifyContent: 'center' }}>
                    <InputItem inputValue={searchValue ?? ''} setValue={setSearchValue} isSearch height={30} />
                </View>
                <View style={{ flex: 0.6, paddingLeft: 10, justifyContent: 'center' }}>
                    <PrimaryButton onPress={onPressAddOrder} onHoverOpacity width={100} title={'NEW ORDER'} height={30} borderRadius={1} />
                </View>
            </View>
        </>
    );

};

export default memo(OrderSearchContainer);  