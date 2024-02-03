import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';
import FONT from '../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flexDirection: 'row',
            gap: 5,
        },
        dateContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.DEFAULT_TEXT_COLOR,
            borderRadius: 3,
        },
        dateTitle: {
            fontSize: FONT.FONT_SIZE_MEDIUM,
            fontFamily: FONT.FONT_FAMILY,
            padding: 5,
        }

    });

    return style;
};
