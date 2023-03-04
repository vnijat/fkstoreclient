import React, { memo, useMemo, useState } from "react";
import { View } from "react-native";
import { InputItem } from "../../../components/inputItem";
import { PrimaryButton } from "../../../components/primaryButton";
import { setPurchaseQueryParams } from "../../../modules/redux/purchaseQuerySlicer";
import { setIsShowPurchaseModal } from "../../../modules/redux/purchaseSlicer";
import { useAppDispatch } from "../../../modules/redux/store";
import PurchaseDataProvider from "../provider/data";
import PurchaseLogicProvider from "../provider/logic";
import { getStyle } from "./styles";



interface IPurchaseSearchContainer {
    logicProvider: ReturnType<typeof PurchaseLogicProvider>;
    dataProvider: ReturnType<typeof PurchaseDataProvider>;
}


const PurchaseSearchContainer = ({ logicProvider, dataProvider }: IPurchaseSearchContainer) => {
    const { purchaseQueryParams } = dataProvider;
    const { handleSearchInput, onPressAddPurchase } = logicProvider;
    const style = useMemo(() => getStyle(), []);


    return (
        <>
            <View style={style.container}>
                <View style={style.searchInputContainer}>
                    <InputItem inputValue={purchaseQueryParams.search ?? ''} setValue={(value) => handleSearchInput(value as string)} isSearch height={30} />
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