import { useMemo } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { OrderItemStatus } from "../../../../../enums/orderItemStatus";
import { PurchaseItemStatus } from "../../../../../enums/purchase";
import { InventoryTrackData } from "../../../../../types/inventory";
import { Colors } from "../../../../../utils/colors";
import { getStyle } from "./styles";



interface ITrackStatusColumn {
    data: InventoryTrackData;
}



const TrackStatusColumn = ({ data }: ITrackStatusColumn) => {
    const style = useMemo(() => getStyle(), []);
    const isCompleted = useMemo(() => [OrderItemStatus.SOLD, OrderItemStatus.USED, PurchaseItemStatus.CONFIRMED].includes(data?.status!), [data]);
    const STATUS_ICON_SIZE = 25;

    const statusIcons = {
        purchase: <Icon name={'circle-with-plus'} size={STATUS_ICON_SIZE} color={Colors.COMPLETED_COLOR} />,
        order: <Icon name={'circle-with-minus'} size={STATUS_ICON_SIZE} color={Colors.DECLINED_COLOR} />
    };

    return (
        <View style={style.container} tooltip={`${data.type}: ${data.status}`.toUpperCase()}>
            <View style={{ width: STATUS_ICON_SIZE, height: STATUS_ICON_SIZE }}>
                {statusIcons[data.type as keyof typeof statusIcons]}
                {!isCompleted &&
                    <View style={style.rejected}>
                        <Icon name={'circle-with-cross'} size={18} color={Colors.DECLINED_COLOR} />
                    </View>
                }
            </View>

        </View >
    );

};

export default TrackStatusColumn;