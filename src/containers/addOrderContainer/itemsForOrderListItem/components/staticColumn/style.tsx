import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../utils/colors';
import FONT from '../../../../../utils/font';

export const getStyle = (columnWidth?: number) => {
    const style = StyleSheet.create({
        staticColumnContainer: {
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: columnWidth,
            height: 30
        },
        staticColumnText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_SMALL
        }

    });

    return style;
};
