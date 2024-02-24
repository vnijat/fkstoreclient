import {View, Text} from "react-native";
import { Colors } from "../../../../../../utils/colors";
import FONT from "../../../../../../utils/font";

interface ITextColumn {
    value: string;
}


const TextColumn = ({ value }: ITextColumn) => {
    return (
        <View style={{ flex: 1, padding: 5 }}>
            <Text selectable style={{ color: Colors.DEFAULT_TEXT_COLOR, fontFamily: FONT.FONT_FAMILY, fontSize: FONT.FONT_SIZE_MEDIUM }}>
                {value ? value.toUpperCase() : '-'}
            </Text>
        </View>
    );

};

export default TextColumn;