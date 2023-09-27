import {StyleSheet, Platform} from 'react-native';
import {Colors} from '../../utils/colors';
import FONT from '../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        toastContainer: {
            minHeight: 60,
            maxWidth: 300,
            maxHeight: 100,
            paddingHorizontal: 5,
            paddingVertical: 5,
            backgroundColor: Colors.CARD_COLOR,
            borderStartWidth: 5,
            borderWidth: 1,
            borderRadius: 10
        },
        toastTitleContainer: {
            flex: 0.3
        },
        toastTitleText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontWeight: FONT.FONT_BOLD,
            fontSize: FONT.FONT_SIZE_SMALL,
            fontFamily: FONT.FONT_FAMILY
        },
        toastMessageContainer: {
            flex: 0.8,
            justifyContent: 'center',
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
