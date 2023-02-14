import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../../utils/colors';
import FONT from '../../../../../../utils/font';


export const getStyle = () => {
    const style = StyleSheet.create({
        filterItemContainer: {
            height: 25,
            flexDirection: 'row',
            backgroundColor: Colors.CARD_HEADER_COLOR,
            borderRadius: 3,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 5,
            margin: 3
        },
        filterItemText: {
            fontSize: FONT.FONT_SIZE_SMALL,
            fontWeight: FONT.FONT_BOLD,
            color: Colors.DEFAULT_TEXT_COLOR
        },
        filterItemActionButton: {
            width: 15,
            height: 15,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 3
        }
    });

    return style;
};
