import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';
import FONT from '../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        tableConfigButton: {
            position: 'absolute',
            top: '30%',
            left: -10,
            width: 100,
            zIndex: 2
        },
        actionModalContent: {
            backgroundColor: Colors.CARD_COLOR,
            minWidth: 100,
            padding: 1
        }
        ,
        actionModalItem: {
            height: 30,
            backgroundColor: Colors.CARD_HEADER_COLOR,
            justifyContent: 'center',
            padding: 5,
            margin: 1
        },
        actionModalItemText: {
            width: '100%',
            color: Colors.DEFAULT_TEXT_COLOR,
            fontFamily: FONT.FONT_FAMILY
        }
    });

    return style;
};
