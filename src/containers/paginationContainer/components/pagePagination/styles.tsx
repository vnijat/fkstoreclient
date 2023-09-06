import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/colors';
import FONT from '../../../../utils/font';

export const getStyle = (textColor?: string, buttonColor?: string) => {
    const style = StyleSheet.create({
        paginationContainer: {
            flexDirection: 'row',
            height: 45,
            alignItems: 'center',
            flex: 1,
            justifyContent: 'space-between',
            paddingHorizontal:20
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
            height: 30,
            margin: 1,
            padding: 1,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 3,
            borderWidth: 1,
            borderColor: Colors.CARD_HEADER_COLOR,
            justifyContent: 'space-between'
        },
        buttonTextStyle: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontWeight: FONT.FONT_BOLD,
            fontSize: FONT.FONT_SIZE_SMALL,

        },
        pickerItem: {
            padding: 2,
        },
        pickerItemText: {
            fontSize: FONT.FONT_SIZE_MEDIUM,
            fontFamily: FONT.FONT_FAMILY,
            color: Colors.DEFAULT_TEXT_COLOR
        },
        pickeritemSelected: {
            padding: 2,
            backgroundColor: Colors.CARD_HEADER_COLOR
        },
        pickerItemSelectedText: {
            fontSize: FONT.FONT_SIZE_MEDIUM,
            fontFamily: FONT.FONT_FAMILY,
            color: Colors.DEFAULT_TEXT_COLOR
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
            paddingHorizontal: 10,
            paddingVertical: 3,
            backgroundColor: Colors.CARD_COLOR,
            borderRadius: 3,
            borderWidth: 1,
            borderColor: Colors.DEFAULT_TEXT_COLOR
        },
        pageInfoText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_SMALL
        },
        pickerContainer: {
            marginLeft: 10,
        }
    });

    return style;
};
