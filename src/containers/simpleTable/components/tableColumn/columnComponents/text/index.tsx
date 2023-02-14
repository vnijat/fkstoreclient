import { Text, View } from "react-native-windows";
import { Colors } from "../../../../../../utils/colors";

interface ITextColumn {
    value: any;
}


const TextColumn = ({ value }: ITextColumn) => {
    return (
        <View style={{ flex: 1, padding: 5 }}>
            <Text selectable style={{ color: Colors.DEFAULT_TEXT_COLOR }}>
                {value}
            </Text>
        </View>
    );

};

export default TextColumn;