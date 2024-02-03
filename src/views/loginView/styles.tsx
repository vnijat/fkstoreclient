import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';
import FONT from '../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flex: 1,
            borderWidth: 5,
            alignItems: 'center',
            borderColor: Colors.DARK_GOLDENROD,
            backgroundColor: Colors.BACKGROUND_COLOR,
        },
        logoContainer: {
            flex: 0.4,
            justifyContent: 'center',
        },
        logoBox: {
            width: 100,
            height: 100,
            paddingTop: 15,
            borderRadius: 20,
            alignItems: 'center',
            borderTopEndRadius: 5,
            justifyContent: 'center',
            borderBottomLeftRadius: 5,
            backgroundColor: Colors.CARD_COLOR,
            borderColor: Colors.CARD_HEADER_COLOR,
        },
        inputsContainer: {
            flex: 0.6,
            alignItems: 'center',
            gap: 10,
        },
        bottomActionText: {
            padding: 5,
            marginBottom: 10,
            color: Colors.DARK_BROWN,
            fontWeight: FONT.FONT_BOLD,
            fontSize: FONT.FONT_SIZE_SMALL,
            textDecorationLine: 'underline',
        },
        input: {
            height: 35,
            width: 200,
            padding: 4,
            borderWidth: 2,
            borderRadius: 3,
            color: Colors.DEFAULT_TEXT_COLOR,
            backgroundColor: Colors.CARD_COLOR,
            borderColor: Colors.CARD_HEADER_COLOR,
        },
        pickerButton: {
            width: 200,
            padding: 5,
            height: 35,
            borderWidth: 2,
            borderRadius: 3,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: Colors.CARD_COLOR,
            borderColor: Colors.CARD_HEADER_COLOR,
        },
        pickerItem: {
            width: 200,
            padding: 5,
            height: 35,
            margin: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: Colors.CARD_HEADER_COLOR,
        },
        pickerItemSelected: {
            width: 200,
            padding: 5,
            height: 35,
            margin: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: Colors.METALLIC_GOLD,
        },
        pickerItemSelectedText: {
            color: Colors.CARD_COLOR
        }

    });

    return style;
};
