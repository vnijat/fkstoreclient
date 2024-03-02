import {View, Text} from "react-native";
import { Colors } from "../../../../../../utils/colors";
import FONT from "../../../../../../utils/font";

interface INumericColumn {
    value: any;
}


const NumericColumn = ({ value }: INumericColumn) => {
    return (
        <View style={{ flex: 1, padding: 5 }}>
            <Text selectable style={{ color: Colors.DEFAULT_TEXT_COLOR, fontSize: FONT.FONT_SIZE_LARGE, fontFamily: FONT.FONT_FAMILY }}>
                {Number(value)}
            </Text>
        </View>
    );

};

export default NumericColumn;