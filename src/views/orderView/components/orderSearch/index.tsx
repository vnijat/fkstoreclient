import React, { memo, useMemo, useState } from "react";
import { View } from "react-native";
import { Alert } from "react-native-windows";
import CustomModal from "../../../../components/customModal";
import { InputItem } from "../../../../components/inputItem";
import { PrimaryButton } from "../../../../components/primaryButton";
import TableInput from "../../../../containers/tableInput";
import { ITableConfig } from "../../../../containers/tableInput/types";
import { setOrdersQueryParams } from "../../../../modules/redux/orderQuerySlicer";
import { setProjectsQueryParams } from "../../../../modules/redux/projectQuerySlicer";
import { setIsShowProjectAddEditModal } from "../../../../modules/redux/projectSlicer";
import { useAppDispatch } from "../../../../modules/redux/store";
import { Colors } from "../../../../utils/colors";
import AddEditOrderModal from "../addEditOrderModal";
import { getStyle } from "./styles";



interface IOrderSearchContainer {
    searchValue: string;




}


const OrderSearchContainer = ({ searchValue }: IOrderSearchContainer) => {
    const style = useMemo(() => getStyle(), []);
    const dispatch = useAppDispatch();
    const [isOpenOrderModal, setIsOpenOrderModal] = useState(false);

    const setSearchValue = (text: string) => {
        dispatch(setOrdersQueryParams({ page: 1, search: text }));
    };

    const onPressAddOrder = () => {
        // dispatch(setIsShowProjectAddEditModal(true));
        setIsOpenOrderModal(true);

    };

    return (
        <>
            <AddEditOrderModal isOpen={isOpenOrderModal} onClose={() => setIsOpenOrderModal(false)} />
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.CARD_COLOR, paddingHorizontal: 20 }}>
                <View style={{ flex: 0.4 }}>
                    <InputItem inputValue={searchValue ?? ''} setValue={setSearchValue} isSearch />
                </View>
                <View style={{ flex: 0.6, paddingLeft: 10 }}>
                    <PrimaryButton onPress={onPressAddOrder} onHoverOpacity width={100} title={'NEW ORDER'} height={30} borderRadius={1} />
                </View>
            </View>
        </>
    );

};

export default memo(OrderSearchContainer);