import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useIsFocused } from "@react-navigation/native";
import { format } from "date-fns";
import React, { useMemo, useRef, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OrderItem } from "../../../types/projectOrder";
import { Colors } from "../../../utils/colors";
import OrderDataProvider from "../../../views/orderView/provider/data";
import OrderLogicProvider from "../../../views/orderView/provider/logic";
import OrderListCard from "./components/orderListCard";

interface IOrdersViewMobile {

}

const OrdersViewMobile = ({ }: IOrdersViewMobile) => {
    const dataProvider = OrderDataProvider();
    const logicProvider = OrderLogicProvider();
    const { queryData: { data, isLoading }, ordersQueryParams } = dataProvider;
    const { } = logicProvider;
    const [cardItems, setCardItems] = useState<OrderItem[]>([]);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['50%'], []);

    const onPressCard = (data: OrderItem[]) => {
        setCardItems(data);
        bottomSheetRef.current?.expand();
    };



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.CARD_COLOR }}>
            <FlatList
                data={data?.orders}
                keyExtractor={(item, index) => `${item.id} -${index}`}
                renderItem={({ item, index }) => <OrderListCard data={item} onPressCard={() => onPressCard(item.orderItems)} />}
            />
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose

            >
                <View style={{ flex: 1 }}>

                    <BottomSheetFlatList
                        data={cardItems}
                        keyExtractor={(item, index) => `${item.id}`}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ height: 30, margin: 2 }}>
                                    <Text style={{ color: Colors.DEFAULT_TEXT_COLOR }}>
                                        {item.name}
                                    </Text>
                                </View>
                            );
                        }}
                    />
                </View>
            </BottomSheet>
        </SafeAreaView>

    );
};

export default OrdersViewMobile;