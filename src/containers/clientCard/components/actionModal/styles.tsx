import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';


export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            backgroundColor: Colors.FLORAL_WHITE,
            flex: 1,
        },
    });

    return style;
};
