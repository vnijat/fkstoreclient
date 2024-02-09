import {useMemo} from "react";
import {Text, View} from "react-native";
import ITEMS_FORORDER_LIST from "./configs";
import {getStyle} from "./style";




interface IItemsForOrderListHeader {
    projectId?: number | null;
}

const ItemsForOrderListHeader = ({projectId}: IItemsForOrderListHeader) => {
    const style = useMemo(() => getStyle(), []);
    return (
        <View style={style.container}>
            {ITEMS_FORORDER_LIST.HEADERS({projectId: !!projectId}).map((header, index) => {
                const isFirstColumn = index == 0;
                const columnWidth = isFirstColumn ? 30 : 120;
                if (header.isHidden) {
                    return null;
                }
                return (
                    <View key={`${header}-${header.dtoKey}`} style={[style.columnContainer, {width: columnWidth}, isFirstColumn && {alignItems: 'center'}]}>
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