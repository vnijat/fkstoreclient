import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';

export const getStyle = (isMoney?: boolean) => {
    const style = StyleSheet.create({
        inputContainer: {
            justifyContent: 'center',
            minHeight: 20,
            flex: 1,
            backgroundColor: Colors.CARD_HEADER_COLOR,
            margin: 1
        },
        textinput: {
            color: Colors.DEFAULT_TEXT_COLOR,
            backgroundColor: Colors.CULTURED,
            borderColor: Colors.CULTURED,
            borderWidth: 0,
            paddingLeft: isMoney ? 20 : 5,
            paddingVertical: 5,
        },
        currency: {
            position: 'absolute',
            left: 5,
            color: Colors.DEFAULT_TEXT_COLOR,
            zIndex: 2,
            top: 5
        }
    });

    return style;
};
