import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';
import FONT from '../../../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        pickerButton: {
            width: 60,
            height: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.CARD_HEADER_COLOR,
        },
        pickerItem: {
            paddingHorizontal: 5,
            margin: 1
        },
        pickerItemSelected: {
            paddingHorizontal: 5,
            margin: 1,
            backgroundColor: Colors.CARD_HEADER_COLOR
        },
        selectedItemText: {
            fontSize: FONT.FONT_SIZE_MEDIUM,
            fontFamily: FONT.FONT_FAMILY,
            color: Colors.DEFAULT_TEXT_COLOR
        },
        itemText: {
            fontSize: FONT.FONT_SIZE_MEDIUM,
            fontFamily: FONT.FONT_FAMILY,
            color: Colors.DEFAULT_TEXT_COLOR
        },
        buttonTextStyle: {
            fontSize: FONT.FONT_SIZE_MEDIUM,
            fontFamily: FONT.FONT_FAMILY,
            color: Colors.DEFAULT_TEXT_COLOR
        }
    });

    return style;
};
