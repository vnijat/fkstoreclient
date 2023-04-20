import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';
import FONT from '../../../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        inputTitleText: {
            fontSize: FONT.FONT_SIZE_SMALL,
            color: Colors.METALLIC_GOLD,
            fontFamily: FONT.FONT_FAMILY,
            fontWeight: FONT.FONT_BOLD
        },
        inputInfoText: {
            fontFamily: FONT.FONT_FAMILY,
            fontSize: FONT.FONT_SIZE_SMALL,
            color: Colors.DEFAULT_TEXT_COLOR
        },
        attributeInputContainer: {
            flexDirection: 'row',
            height: 30,
            borderRadius: 3,
            backgroundColor: Colors.CARD_HEADER_COLOR,
        },
        inputContainer: {
            flexDirection: 'row',
            backgroundColor: Colors.CARD_HEADER_COLOR,
            maxWidth: 60
        },
        textInput: {
            borderColor: Colors.CARD_HEADER_COLOR,
            backgroundColor: 'transparent',
            color: Colors.DEFAULT_TEXT_COLOR,
        },
        inputSeperator: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_SMALL
        }
    });

    return style;
};
