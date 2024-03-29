import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';

export const getStyle = (width?: number, borderColor?: string) => {
    const style = StyleSheet.create({
        modalContent: {
            width: width || 500,
            backgroundColor: Colors.CARD_COLOR,
            borderRadius: 3,
            borderWidth: 2,
            borderColor: borderColor || Colors.DEFAULT_TEXT_COLOR,
            zIndex: 1,
        },
        closeButton: {
            position: 'absolute',
            top: -5,
            right: -5,
            zIndex: 2,
            width: 22,
            height: 22,
            borderRadius: 22,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.CARD_COLOR
        }

    });

    return style;
};
