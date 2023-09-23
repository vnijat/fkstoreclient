import { Text, View } from "react-native-windows";
import { Colors } from "../../../../../../utils/colors";
import { currency } from "../../../../../../utils/currency.windows";
import FONT from "../../../../../../utils/font";

interface IMoneyColumn {
    value: any;
}


const MoneyColumn = ({ value }: IMoneyColumn) => {
    return (
        <View style={{ flex: 1, padding: 5 }}>
            <Text selectable style={{ color: Colors.DEFAULT_TEXT_COLOR, fontFamily: FONT.FONT_FAMILY, fontSize: FONT.FONT_SIZE_LARGE }}>
                {currency.format(value)}
            </Text>
        </View>
    );

};

export default MoneyColumn;