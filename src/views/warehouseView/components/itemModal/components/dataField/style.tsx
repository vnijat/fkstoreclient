import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../../utils/colors';
import FONT from '../../../../../../utils/font';

export const getStyle = (height?: number | string, backgroundColor?: string, width?: number | string) => {
    const style = StyleSheet.create({
        container: {
            marginHorizontal: 2,
            marginVertical: 2
        },
        titleContainer: {
            marginBottom: 1
        },
        titleText: {
            fontFamily: FONT.FONT_FAMILY,
            fontSize: FONT.FONT_SIZE_MEDIUM,
            color: Colors.DEFAULT_TEXT_COLOR,
            fontWeight: FONT.FONT_BOLD
        },
        valueContainer: {
            backgroundColor: backgroundColor || Colors.CARD_HEADER_COLOR,
            width: width || '100%',
            height: height || 30,
            borderRadius: 3,
            flexWrap: 'wrap'
        },
        valueText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_MEDIUM,
            padding: 5
        }

    });


    return style;
};
