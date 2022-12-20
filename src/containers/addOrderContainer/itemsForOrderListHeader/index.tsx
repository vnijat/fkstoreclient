import { Text, View } from "react-native";
import { Colors } from "../../../utils/colors";
import ITEMS_FORORDER_LIST from "./configs";




interface IItemsForOrderListHeader {

}

const ItemsForOrderListHeader = ({ }: IItemsForOrderListHeader) => {

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: 40 }}>
            {ITEMS_FORORDER_LIST.HEADERS.map((header, index) => {
                const columnWidth = index == 0 ? 60 : 120;
                return (
                    <View key={`${header}-${header.dtoKey}`} style={{ height: 30, justifyContent: 'center', alignItems: 'flex-start', width: columnWidth, margin: 1 }}>
                        <Text style={{ color: Colors.DEFAULT_TEXT_COLOR, fontSize: 12 }}>
                            {header.title}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
};

export default ItemsForOrderListHeader;