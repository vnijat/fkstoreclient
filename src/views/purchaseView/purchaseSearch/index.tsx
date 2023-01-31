import React, { memo, useMemo, useState } from "react";
import { View } from "react-native";
import { InputItem } from "../../../components/inputItem";
import { PrimaryButton } from "../../../components/primaryButton";
import { setPurchaseQueryParams } from "../../../modules/redux/purchaseQuerySlicer";
import { setIsShowPurchaseModal } from "../../../modules/redux/purchaseSlicer";
import { useAppDispatch } from "../../../modules/redux/store";
import { getStyle } from "./styles";



interface IPurchaseSearchContainer {
    searchValue: string;




}


const PurchaseSearchContainer = ({ searchValue }: IPurchaseSearchContainer) => {
    const style = useMemo(() => getStyle(), []);
    const dispatch = useAppDispatch();

    const setSearchValue = (text: string) => {
        dispatch(setPurchaseQueryParams({ page: 1, search: text }));
    };

    const onPressAddPurchase = () => {
        dispatch(setIsShowPurchaseModal(true));
    };

    return (
        <>
            <View style={style.container}>
                <View style={style.searchInputContainer}>
                    <InputItem inputValue={searchValue ?? ''} setValue={setSearchValue} isSearch />
                </View>
                <View style={style.actionButtonContainer}>
                    <PrimaryButton onPress={onPressAddPurchase}
                        title={'NEW PURCHASE'}
                        onHoverOpacity
                        width={150}
                        height={30}
                        borderRadius={1} />
                </View>
            </View>
        </>
    );

};

export default memo(PurchaseSearchContainer);