import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flexDirection: 'row',
            height: '100%',
            backgroundColor: Colors.CARD_COLOR,
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 5,
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: 5,
            elevation: 2
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
