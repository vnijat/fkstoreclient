import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/colors';
import FONT from '../../../../utils/font';

export const getStyle = (textColor?: string, buttonColor?: string) => {
    const style = StyleSheet.create({
        paginationContainer: {
            // flexDirection: 'row',
            // height: 45,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            gap: 2,
            paddingVertical: 2,
        },
        buttonsStyle: {
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
            height: 30,
            margin: 1,
            padding: 1,
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: Colors.CARD_HEADER_COLOR,
            justifyContent: 'space-between'
        },
        buttonTextStyle: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontWeight: FONT.FONT_BOLD,
            fontSize: FONT.FONT_SIZE_SMALL,

        },
        pickerItem: {
            alignItems: 'center',
            backgroundColor: Colors.CARD_COLOR,
            alignSelf: 'stretch',
            justifyContent: 'center',
            height: 60


        },
        pickerItemText: {
            fontSize: FONT.FONT_SIZE_LARGE,
            fontFamily: FONT.FONT_FAMILY,
            color: Colors.DEFAULT_TEXT_COLOR,
            fontWeight: FONT.FONT_BOLD,
        },
        pickeritemSelected: {
            alignItems: 'center',
            backgroundColor: Colors.CARD_COLOR,
            alignSelf: 'stretch',
            justifyContent: 'center',
            height: 60,
        },
        pickerItemSelectedText: {
            fontSize: FONT.FONT_SIZE_LARGE,
            fontFamily: FONT.FONT_FAMILY,
            color: Colors.METALLIC_GOLD,
            fontWeight: FONT.FONT_BOLD,
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
        paginationBottomContainer: {
            flexGrow: 1,
            alignSelf: 'stretch',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 5,
            backgroundColor: Colors.CARD_COLOR,
            borderRadius: 3,
        },
        pageInfoText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_SMALL
        },
        pickerContainer: {
            // marginLeft: 10,
        }
    });

    return style;
};
