import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';
import FONT from '../../../../utils/font';

export const getStyle = (isCurrent?: boolean) => {
    const style = StyleSheet.create({
        buttonsStyle: {
            height: 30,
            justifyContent: 'center',
        },
        pageText: {
            color: isCurrent ? Colors.CARD_COLOR : Colors.DEFAULT_TEXT_COLOR,
            textAlign: 'center',
            fontSize: 12
        },
        pageButtons: {
            height: 25,
            width: 30,
            margin: 1,
            borderRadius: 2,
            justifyContent: 'center',
            backgroundColor: isCurrent ? Colors.DEFAULT_TEXT_COLOR : Colors.CARD_COLOR
        },
        pageNumberPressed: {
            backgroundColor: Colors.CARD_HEADER_COLOR
        },
    });

    return style;
};
