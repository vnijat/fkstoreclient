import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';
import FONT from '../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors.CARD_COLOR,
        },
        input: {
            height: 35,
            padding: 5,
            borderColor: 'transparent'
        },
        avatarModalItem: {
            flex: 1,
            backgroundColor: Colors.CARD_HEADER_COLOR,
            justifyContent: 'center',
            padding: 5
        },
        avatarModalText: {
            color: Colors.DEFAULT_TEXT_COLOR
        },
        inputsContainer: {
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 10,
            paddingBottom: 50,
        },
        topContainer: {
            backgroundColor: Colors.CARD_COLOR,
            justifyContent: "center",
            alignItems: 'center',
            flex: 0.2,
        },
        avatarContainer: {
            height: 100,
            width: 100,
            backgroundColor: Colors.CARD_HEADER_COLOR,
            borderRadius: 100,
            borderWidth: 3,
            borderColor: Colors.CARD_HEADER_COLOR,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 1,
        },
        avatarHoverText: {
            position: 'absolute',
            alignSelf: 'center',
            zIndex: 3,
            color: Colors.DEFAULT_TEXT_COLOR,
            top: '40%',
            fontSize: FONT.FONT_SIZE_SMALL,
            opacity: 0.4,
            fontWeight: FONT.FONT_BOLD
        },
        saveButton: {
            bottom: 30,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 3,
            backgroundColor: Colors.DEFAULT_TEXT_COLOR,
            padding: 5,
            width: 200,
            height: 40,

        },
        buttonText: {
            fontSize: FONT.FONT_SIZE_MEDIUM,
            color: Colors.CARD_COLOR,
        }
    });

    return style;
};
