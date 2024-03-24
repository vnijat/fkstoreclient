import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        box: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 25,
            height: 25,
            borderRadius: 5,
            margin: 5,
            borderWidth: 1,
            borderColor: Colors.CARD_HEADER_COLOR
        },
        checkContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 25,
            height: 25,
            borderRadius: 5,
        }

    });

    return style;
};
