import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        iconContainer: {
            borderColor: Colors.CARD_HEADER_COLOR,
            borderRadius: 30,
            borderWidth: 2,
            justifyContent: 'center',
            width: 30,
            height: 30,
        },
        iconButton: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        animatedIconSelector: {
            width: 60,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 30,
        }
    });

    return style;
};
