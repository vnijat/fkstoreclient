import {StyleSheet} from 'react-native';
import {Colors} from '../../../../../utils/colors';
import FONT from '../../../../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.CARD_HEADER_COLOR,
            borderRadius: 3,
            width: 50,
            height: 40,
            paddingHorizontal: 10,
            paddingVertical: 5,
        },
        text: {
            fontSize: FONT.FONT_SIZE_MEDIUM,
            textAlign: 'center',
            justifyContent: 'center',
            color: Colors.DEFAULT_TEXT_COLOR,
            fontWeight: FONT.FONT_BOLD,
            fontFamily: FONT.FONT_FAMILY
        }
    });

    return style;
};
