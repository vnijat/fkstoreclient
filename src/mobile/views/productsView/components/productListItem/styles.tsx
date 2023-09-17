import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../utils/colors';
import FONT from '../../../../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            backgroundColor: Colors.CARD_HEADER_COLOR,
            height: 80,
            marginHorizontal: 5,
            marginVertical: 2,
            borderRadius: 3
        },
        contentContainer: {
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: 5,
            paddingVertical: 5
        },
        bottomContainer: {
            flex: 0.3,
            flexDirection: 'row',
            alignItems: 'center'
        },
        rigthContainer: {
            flex: 0.3,
            justifyContent: 'space-around',
            alignItems: 'flex-end',
        },
        rightContianerItem: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        rightContainerItemText: {
            fontSize: FONT.FONT_SIZE_MEDIUM,
            fontFamily: FONT.FONT_FAMILY,
            marginRight: 5,
            color: Colors.DEFAULT_TEXT_COLOR
        },
        barcodeText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_SMALL,
            fontWeight: FONT.FONT_BOLD
        },
        productNameText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_MEDIUM
        }
    });

    return style;
};
