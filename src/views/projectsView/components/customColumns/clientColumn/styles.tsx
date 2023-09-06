import {StyleSheet} from 'react-native';
import {Colors} from '../../../../../utils/colors';
import FONT from '../../../../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 3,
            padding: 5,
            flex: 1,
            marginRight: 10,
            backgroundColor: Colors.CARD_HEADER_COLOR,
        },
        columContentText: {
            maxHeight: 40,
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_MEDIUM,
            fontWeight: FONT.FONT_BOLD,
            fontFamily: FONT.FONT_FAMILY,
        },
        clientIconContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 5,
            width: 35,
            height: 35,
            borderRadius: 32,
            backgroundColor: Colors.CARD_COLOR
        },
    });

    return style;
};
