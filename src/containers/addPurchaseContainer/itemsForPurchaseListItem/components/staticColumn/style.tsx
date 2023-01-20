import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../../../../utils/colors';
import FONT from '../../../../../utils/font';

export const getStyle = (index?: number) => {
    const columnWidth = index == 0 ? 30 : 120;
    const align: StyleProp<ViewStyle> = index == 0 ? {
        alignItems: 'center',
    } : {
        alignItems: 'flex-start',
    };

    const style = StyleSheet.create({
        staticColumnContainer: {
            justifyContent: 'center',
            width: columnWidth,
            height: 30,
            margin: 1,
            ...align
        },
        staticColumnText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_SMALL
        }

    });

    return style;
};
