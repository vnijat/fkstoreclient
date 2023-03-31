import { useMemo } from "react";
import { Text, View } from "react-native";
import ITEMS_FORORDER_LIST from "./configs";
import { getStyle } from "./style";




interface IItemsForOrderListHeader {

}

const ItemsForOrderListHeader = ({ }: IItemsForOrderListHeader) => {
    const style = useMemo(() => getStyle(), []);
    return (
        <View style={style.container}>
            {ITEMS_FORORDER_LIST.HEADERS.map((header, index) => {
                const isFirstColumn = index == 0;
                const columnWidth = isFirstColumn ? 30 : 120;
                return (
                    <View key={`${header}-${header.dtoKey}`} style={[style.columnContainer, { width: columnWidth }, isFirstColumn && { alignItems: 'center' }]}>
                        <Text style={style.columnText}>
                            {header.title.toUpperCase()}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
};

export default ItemsForOrderListHeader;