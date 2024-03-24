import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            marginLeft: 10,
            alignItems: 'center',
            justifyContent: 'center',
        },

    });

    return style;
};
