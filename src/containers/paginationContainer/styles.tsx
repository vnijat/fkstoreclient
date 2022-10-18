import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            height: 45,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
        },


    });

    return style;
};
