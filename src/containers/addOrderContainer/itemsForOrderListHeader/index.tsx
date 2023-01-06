import { useMemo } from "react";
import { Text, View } from "react-native";
import { Colors } from "../../../utils/colors";
import ITEMS_FORORDER_LIST from "./configs";
import { getStyle } from "./style";




interface IItemsForOrderListHeader {

}

const ItemsForOrderListHeader = ({ }: IItemsForOrderListHeader) => {
    const style = useMemo(() => getStyle(), []);
    return (
        <View style={style.container}>
            {ITEMS_FORORDER_LIST.HEADERS.map((header, index) => {
                const columnWidth = index == 0 ? 60 : 120;
                return (
                    <View key={`${header}-${header.dtoKey}`} style={[style.columnContainer, { width: columnWidth }]}>
                        <Text style={style.columnText}>
                            {header.title}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
};

export default ItemsForOrderListHeader;