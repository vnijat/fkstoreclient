import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: Colors.BACKGROUND_COLOR,
            padding: 10
        },
        topContainer: {
            flexGrow: 1,
        },
        bottomContainer: {
            flexGrow: 1
        }
    });

    return style;
};
