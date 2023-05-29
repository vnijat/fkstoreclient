import { StyleSheet } from 'react-native';
import { Colors } from '../../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        dropDownContainer: {
            position: 'absolute',
            width: '97%',
            height: 250,
            backgroundColor: Colors.CARD_COLOR,
            elevation: 3,
            zIndex: 3,
            top: 40,
            alignSelf: 'center',
            overflow: 'hidden',
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
        }

    });

    return style;
};
