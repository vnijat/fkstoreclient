import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            width: "100%",
            height: 45,
            flexDirection: 'row',
            backgroundColor: Colors.FLORAL_WHITE,
            alignItems: 'center',
            paddingHorizontal: 10,
        },


    });

    return style;
};
