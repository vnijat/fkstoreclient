import {StyleSheet, Platform} from 'react-native';
import {Colors} from '../../utils/colors';
import FONT from '../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        toastContainer: {
            minHeight: 50,
            minWidth: 200,
            maxWidth: 300,
            maxHeight: 100,
            backgroundColor: Colors.CARD_COLOR,
            borderStartWidth: 5,
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
        },
        toastTitleContainer: {
            flex: 0.4,
            justifyContent: 'center',
        },
        toastTitleText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontWeight: FONT.FONT_BOLD,
            fontSize: FONT.FONT_SIZE_SMALL,
            fontFamily: FONT.FONT_FAMILY
        },
        toastMessageContainer: {
            flex: 0.6,
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap'
        },
        toastMessageText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_MEDIUM,
            fontFamily: FONT.FONT_FAMILY
        }
    });

    return style;
};
