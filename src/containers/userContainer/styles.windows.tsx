import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';
import FONT from '../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor:Colors.CARD_COLOR
        },
        leftContainer: {
            flex: 0.5,
            alignItems: 'center',
        },
        rightContainer: {
            flex: 0.5,
            gap: 5,
            alignItems: 'center',
        },
        input: {
            height: 35,
            padding: 5,
            borderColor: 'transparent'
        },
        inputContainer: {
            borderRadius: 5,
            width: 200,
            color: Colors.DEFAULT_TEXT_COLOR,
            borderColor: Colors.CARD_HEADER_COLOR,
            justifyContent: 'center'
        },
        avatarContainer: {
            marginTop: 20,
            height: 100,
            width: 100,
            backgroundColor: Colors.CARD_HEADER_COLOR,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center'
        },
        saveButton: {
            bottom: 20,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 3,
            backgroundColor: Colors.DEFAULT_TEXT_COLOR,
            padding: 5,
            width: 200,

        },
        buttonText: {
            fontSize: FONT.FONT_SIZE_MEDIUM,
            color: Colors.CARD_COLOR,
        }
    });

    return style;
};
