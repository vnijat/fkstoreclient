import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors.BACKGROUND_COLOR,
            // alignItems: 'center'
        },
    });

    return style;
};
