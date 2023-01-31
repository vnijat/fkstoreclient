import { StyleSheet } from 'react-native';
import { Colors } from '../../../utils/colors';
import FONT from '../../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors.BACKGROUND_COLOR,
        },
        columContent: {
            minHeight: 50,
            maxHeight: 80,
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
        },
        columContentText: {
            maxHeight: 40,
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: 12,
            fontWeight: '400',
            width: 90,
        },
        rowItem: {
            flexDirection: 'row',
            borderRadius: 3,
            flex: 1,
            justifyContent: 'space-evenly',
            paddingLeft: 5,
            marginVertical: 1,
            backgroundColor: Colors.CARD_COLOR
        },
        contextMenuContent: {
            width: 150,
            maxHeight: 200,
            backgroundColor: Colors.CARD_COLOR,
            padding: 2
        },
        contextMenuItem: {
            width: '100%',
            height: 30,
            flexDirection: 'row',
            backgroundColor: Colors.CARD_HEADER_COLOR,
            marginVertical: 1,
            alignItems: 'center',
            paddingHorizontal: 5
        },
        dateColumnContainer: {
            justifyContent: 'center',
            marginLeft: 5,
            paddingHorizontal: 2,
            paddingVertical: 2,
            borderRadius: 3,
            backgroundColor: Colors.DEFAULT_TEXT_COLOR,
            alignItems: 'center'
        },
        dateText: {
            color: Colors.CULTURED,
            fontSize: FONT.FONT_SIZE_SMALL
        }
    });

    return style;
};
