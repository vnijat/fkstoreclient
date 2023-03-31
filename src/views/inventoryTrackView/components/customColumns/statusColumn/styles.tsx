import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            minWidth: 200,
            justifyContent: 'center'
        },
        rejected: {
            position: 'absolute',
            zIndex: 2,
            top: -5,
            right: -5,
            justifyContent: 'center',
            backgroundColor: Colors.CARD_COLOR,
            borderRadius: 24,
            alignItems: 'center',
            width: 18,
            height: 18,
            alignContent: 'center'
        }
    });

    return style;
};
