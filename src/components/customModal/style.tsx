import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';

export const getStyle = (width?: number, height?: number, borderColor?: string,) => {
    const style = StyleSheet.create({
        modalContent: {
            width: width || '80%',
            backgroundColor: Colors.CARD_COLOR,
            alignSelf: 'center',
            height: height || '30%',
            top: '40%',
            borderRadius: 3,
            borderWidth: 2,
            borderColor: borderColor || Colors.DEFAULT_TEXT_COLOR,
        },
        closeButton: {
            position: 'absolute',
            top: '36%',
            // right: '7%',
            alignSelf: 'center',
            zIndex: 2,
            width: 30,
            height: 30,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.CARD_COLOR
        }

    });

    return style;
};
