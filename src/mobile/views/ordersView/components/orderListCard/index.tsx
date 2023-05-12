import { format } from "date-fns";
import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { CompletedIcon, DeclinedIcon, InProgressIcon } from "../../../../../assets/icons/clientCardIcons";
import CustomPressable from "../../../../../components/customPressable";
import { OrderStatus } from "../../../../../enums/orderStatus";
import { ProjectOrder } from "../../../../../types/projectOrder";
import { Colors } from "../../../../../utils/colors";
import { getStyle } from "../../styles";


interface IOrderListCard {
    data: ProjectOrder;
    onPressCard?: () => void;
    index: number;
}



const OrderListCard = ({ data, onPressCard, index }: IOrderListCard) => {
    const style = useMemo(() => getStyle(), []);

    const orderUpdateDate = format(new Date(data.createdAt!), 'd MMM / yyyy');
    const orderUpdateTime = format(new Date(data.createdAt!), 'k:mm');

    const orderStatusColors = {
        [OrderStatus.COMPLETED]: Colors.COMPLETED_COLOR,
        [OrderStatus.DECLINED]: Colors.DECLINED_COLOR,
        [OrderStatus.PENDING]: Colors.INPROGRESS_COLOR
    };

    const orderStatusIcons = {
        [OrderStatus.COMPLETED]: <CompletedIcon size={20} color={Colors.COMPLETED_COLOR} />,
        [OrderStatus.DECLINED]: <DeclinedIcon size={20} color={Colors.DECLINED_COLOR} />,
        [OrderStatus.PENDING]: <InProgressIcon size={20} color={Colors.INPROGRESS_COLOR} />
    };


    const onPressHandler = () => {
        onPressCard && onPressCard();
    };


    return (
        <CustomPressable
            onPress={onPressHandler}
            android_ripple={{ color: orderStatusColors[data.status] }}
            style={style.cardContainer}>
            <View style={{ flex: 1 }}>
                <View style={[style.dateContainer, { backgroundColor: orderStatusColors[data.status] }]}>
                    <Text style={style.dateText}>
                        {orderUpdateDate}
                    </Text>
                    <Text style={style.dateText}>
                        {orderUpdateTime}
                    </Text>
                </View>
                <View style={style.cardContentContainer}>
                    <View style={style.statusIcon}>
                        {orderStatusIcons[data.status]}
                    </View>
                    <View style={style.cartItemsCount}>
                        <Text style={style.countText}>
                            {data.totalItems}
                        </Text>
                    </View>
                    <View style={style.detailContainer}>
                        <Text style={style.detailText} adjustsFontSizeToFit={true}>
                            {data.detail?.length ? data.detail : `ID: ${data.id}`}
                        </Text>
                    </View>
                </View>
            </View>
        </CustomPressable>
    );
};


export default OrderListCard;