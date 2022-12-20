import { memo, useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { InputItem } from "../../components/inputItem";
import { clearOrderDataForPost } from "../../modules/redux/orderSlicer";
import { RootState, useAppDispatch } from "../../modules/redux/store";
import { Colors } from "../../utils/colors";
import ItemsForOrderList from "./itemsForOrderList";
import ItemsForOrderListHeader from "./itemsForOrderListHeader";
import ItemsForOrderSearch from "./itemsForOrderSearch";



interface IAddOrderContainer {

}

const AddOrderCntainer = ({ }: IAddOrderContainer) => {
    const dispatch = useAppDispatch();
    const itemsForOrder = useSelector((state: RootState) => state.ordersSlicer?.orderDataForPost?.orderItems);


    useEffect(() => {
        return () => {
            dispatch(clearOrderDataForPost());
        };
    }, []);


    return (
        <View style={{ flex: 1, paddingHorizontal: 5 }}>
            <View style={{ flex: 0.1 }}>
                <ItemsForOrderSearch />
            </View>
            <View style={{ flex: 0.8 }}>
                <View style={{ height: 40, backgroundColor: Colors.CARD_HEADER_COLOR }}>
                    <ItemsForOrderListHeader />
                </View>
                <View style={{ backgroundColor: Colors.CULTURED, height: 500 }}>
                    <ItemsForOrderList orderItems={itemsForOrder ?? []} />
                </View>
            </View>
            <View style={{ flex: 0.1 }}>
                <View style={{ height: 20, backgroundColor: Colors.CARD_HEADER_COLOR }}>
                </View>
            </View>
        </View>
    );
};

export default memo(AddOrderCntainer);