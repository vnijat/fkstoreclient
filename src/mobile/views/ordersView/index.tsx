import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import CustomPressable from "../../../components/customPressable";
import { useGetOrdersQuery } from "../../../modules/api/orders.api";
import { RootState } from "../../../modules/redux/store";
import { ProjectOrder } from "../../../types/projectOrder";
import { Colors } from "../../../utils/colors";

interface IOrdersViewMobile {

}

const OrdersViewMobile = ({ }: IOrdersViewMobile) => {
    const ordersQueryParams = useSelector((state: RootState) => state.ordersQueryParams);
    const { data } = useGetOrdersQuery(ordersQueryParams, {
        selectFromResult: ({ data }) => ({
            data
        })
    });



    const OrderListItem = ({ data }: { data: ProjectOrder; }) => {
        const onPressHandler = () => {
            console.log("pressed======>");
        };
        return (
            <CustomPressable
                onPress={onPressHandler}
                style={{}}>

                <View style={{ flex: 1 }}>
                    <View>
                    </View>
                </View>
            </CustomPressable>
        );
    };

    const ListHeader = ({ }) => {
        return (
            <>
            </>
        );
    };



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.CARD_COLOR }}>
            {/* <FlatList
                ListHeaderComponent={ }
            /> */}
        </SafeAreaView>
    );
};

export default OrdersViewMobile;