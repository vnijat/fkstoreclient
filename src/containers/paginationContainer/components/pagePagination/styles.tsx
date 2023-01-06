import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';
import FONT from '../../../../utils/font';

export const getStyle = (textColor?: string, buttonColor?: string) => {
    const style = StyleSheet.create({
        paginationContainer: {
            flexDirection: 'row',
            height: 45,
            alignItems: 'center',
            flex: 1,
            justifyContent: 'space-between'
        },
        buttonsStyle: {
            height: 30,
            justifyContent: 'center',
        },
        pageText: {
            color: Colors.CARD_COLOR,
            textAlign: 'center',
            fontSize: 12
        },
        pageButtons: {
            height: 25,
            width: 30,
            margin: 1,
            borderRadius: 2,
            justifyContent: 'center'
        },
        pickerButton: {
            minWidth: 60,
            maxWidth: 200,
            height: 25,
            margin: 1,
            padding: 1,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 1,
            borderWidth: 1,
            borderColor: Colors.CARD_COLOR,
            justifyContent: 'space-between'
        },
        pageNumbersContainer: {
            flexDirection: 'row',
            width: 160,
            justifyContent: 'center'
        },
        pageNumberPressed: {
            backgroundColor: Colors.CARD_HEADER_COLOR
        },
        paginationLeftContainer: {
            flexDirection: 'row'
        },
        paginationRightContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        pageInfoText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_SMALL
        },
        pickerContainer: { marginLeft: 10 }
    });

    return style;
};
