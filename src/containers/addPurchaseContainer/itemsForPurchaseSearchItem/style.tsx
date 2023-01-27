import { StyleSheet } from 'react-native';
import { Colors } from '../../../utils/colors';
import FONT from '../../../utils/font';


export const getStyle = () => {
    const style = StyleSheet.create({
        columnContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            height: 30,
            width: 120,
            margin: 1
        },
        titleText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_VERY_SMALL,
            marginRight: 5
        },
        valueText: {
            color: Colors.METALLIC_GOLD,
            fontSize: FONT.FONT_SIZE_VERY_SMALL,
            fontWeight: FONT.FONT_BOLD
        },
        searchedItemContainer: {
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: Colors.CARD_COLOR,
            margin: 1,
            paddingHorizontal: 5,
            width: '100%'
        }
    });

    return style;
};
