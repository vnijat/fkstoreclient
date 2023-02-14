import { Text, View } from "react-native-windows";
import { Colors } from "../../../../../../utils/colors";

interface INumericColumn {
    value: any;
}


const NumericColumn = ({ value }: INumericColumn) => {
    return (
        <View style={{ flex: 1, padding: 5 }}>
            <Text selectable style={{ color: Colors.DEFAULT_TEXT_COLOR }}>
                {Number(value)}
            </Text>
        </View>
    );

};

export default NumericColumn;