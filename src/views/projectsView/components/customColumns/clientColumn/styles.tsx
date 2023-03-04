import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../utils/colors';
import FONT from '../../../../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 3

        },
        columContentText: {
            maxHeight: 40,
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: 12,
            fontWeight: '400',
            width: 90,
        },
        clientIconContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 5,
            width: 35,
            height: 35,
            borderRadius: 32,
            backgroundColor: Colors.CARD_HEADER_COLOR
        },
    });

    return style;
};
