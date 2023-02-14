import { Text, View } from "react-native-windows";
import { Colors } from "../../../../../../utils/colors";

interface IDateColumn {
    value: any;
}


const DateColumn = ({ value }: IDateColumn) => {
    return (
        <View style={{ flex: 1, padding: 5 }}>
            <Text style={{ color: Colors.DEFAULT_TEXT_COLOR }}>
                {value}
            </Text>
        </View>
    );

};

export default DateColumn;