import { Text, View } from "react-native-windows";
import { Colors } from "../../../../../../utils/colors";

interface IDateColumn {
    value: any;
}


const DateColumn = ({ value }: IDateColumn) => {
    const date = new Date(value);

    return (
        <View style={{ flex: 1, padding: 5 }}>
            <View style={{ backgroundColor: Colors.DEFAULT_TEXT_COLOR, borderRadius: 3, paddingVertical: 3, width: 80, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: Colors.CARD_COLOR }}>
                    {date?.toLocaleDateString()}
                </Text>
            </View>
        </View>
    );

};

export default DateColumn;