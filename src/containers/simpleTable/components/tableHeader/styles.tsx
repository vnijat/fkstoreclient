import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/colors';
import FONT from '../../../../utils/font';



export const getStyle = (columnWidth?: number) => {
    const style = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 5,
            gap: 5
        },
        headerColumn: {
            flex: 1,
            padding: 5,
            minWidth: columnWidth || 200,
            maxWidth: 250
        },
        headerText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_MEDIUM,
            fontFamily: FONT.FONT_FAMILY,
            fontWeight: FONT.FONT_BOLD
        }

    });

    return style;
};
