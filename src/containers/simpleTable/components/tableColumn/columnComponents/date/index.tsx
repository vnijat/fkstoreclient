import {Text, View} from "react-native";
import {Colors} from "../../../../../../utils/colors";
import FONT from "../../../../../../utils/font";

interface IDateColumn {
    value: any;
}


const DateColumn = ({value}: IDateColumn) => {
    const date = new Date(value);

    return (
        <View style={{flex: 1, padding: 5}}>
            {<View style={{borderRadius: 3, paddingVertical: 3, width: 80, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: Colors.DEFAULT_TEXT_COLOR, fontWeight: FONT.FONT_BOLD, fontFamily: FONT.FONT_FAMILY, fontSize: FONT.FONT_SIZE_MEDIUM}} selectable>
                    {value ? date.toLocaleDateString() : '-'}
                </Text>
                <Text style={{color: Colors.DEFAULT_TEXT_COLOR, fontFamily: FONT.FONT_FAMILY, fontSize: FONT.FONT_SIZE_SMALL}} selectable>
                    {value && date.toLocaleTimeString()}
                </Text>
            </View>}
        </View>
    );

};

export default DateColumn;