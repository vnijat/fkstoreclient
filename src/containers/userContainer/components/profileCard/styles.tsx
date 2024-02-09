import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flexDirection: 'row',
            height: 40,
            backgroundColor: Colors.CARD_COLOR,
            alignItems: 'center',
            gap: 10,
            borderRadius: 5,
            padding: 10,
        },
        avatarContainer: {
            height: 30,
            width: 30,
            backgroundColor: Colors.CARD_HEADER_COLOR,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center'
        }
    });

    return style;
};
