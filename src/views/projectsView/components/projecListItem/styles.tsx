import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';
import FONT from '../../../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors.BACKGROUND_COLOR,
            // alignItems: 'center'
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
        clientIconContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 5,
            width: 35,
            height: 35,
            borderRadius: 32,
            backgroundColor: Colors.CARD_HEADER_COLOR
        },
        dateColumnContainer: {
            justifyContent: 'center',
            paddingHorizontal: 2,
            paddingVertical: 2,
            borderRadius: 3,
            backgroundColor: Colors.DEFAULT_TEXT_COLOR,
            alignItems: 'center'
        },
        dateText: {
            color: Colors.CULTURED,
            fontSize: FONT.FONT_SIZE_SMALL
        },
        contexMenuItem: {
            width: '100%',
            height: 30,
            flexDirection: 'row',
            backgroundColor: Colors.CARD_HEADER_COLOR,
            marginVertical: 1,
            alignItems: 'center',
            paddingHorizontal: 5
        },
        contextMenuContainer: {
            width: 150,
            maxHeight: 200,
            backgroundColor: Colors.CARD_COLOR,
            padding: 2
        }
    });

    return style;
};
