import React, { memo, useMemo } from "react";
import { ActivityIndicator, Alert, FlatList, View } from "react-native";
import { useDeleteOrderMutation } from "../../../../modules/api/orders.api";
import HELP from "../../../../services/helpers";
import { ProjectOrder } from "../../../../types/projectOrder";
import { Project } from "../../../../types/projectsQuery";
import { Colors } from "../../../../utils/colors";
import OrderHeader from "../orderHeader";
import OrderListItem from "../orderListItem";
import { getStyle } from "./styles";




interface IOrderList {
    data: ProjectOrder[];


}


const OrderList = ({ data }: IOrderList) => {
    const style = useMemo(() => getStyle(), []);
    const [apiDeleteOrder] = useDeleteOrderMutation();



    const onDeleteOrder = async (orderId: number) => {
        try {
            const response = await apiDeleteOrder(orderId);
            if (response.error) {
                throw response.error;
            }
        } catch (error) {
            if (error?.data?.message) {
                HELP.alertError(error);
            }
        }
    };


    return (

        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: Colors.CARD_HEADER_COLOR, justifyContent: 'center' }}>
                <OrderHeader />
            </View>
            <View>
            </View>
            <FlatList
                style={{ flex: 1, backgroundColor: Colors.BACKGROUND_COLOR }}
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <OrderListItem
                            key={item.id}
                            data={item}
                            onDeleteOrder={onDeleteOrder}
                        />
                    );
                }}
            />
        </View>


    );


};

export default memo(OrderList);