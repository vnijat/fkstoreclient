import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../../utils/colors';
import FONT from '../../../../../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            height: 30,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingLeft: 36

        },
        columnContainer: {
            justifyContent: 'center',
            flex: 1,
        },
        columnText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontWeight: FONT.FONT_BOLD,
            fontSize: FONT.FONT_SIZE_VERY_SMALL,
        }
    });

    return style;
};
