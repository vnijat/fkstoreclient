import {StyleSheet} from 'react-native';
import FONT from '../../utils/font';
import {Colors} from '../../utils/colors';

export const getStyle = (textColor?: string, buttonColor?: string, disabled?: boolean) => {
    const style = StyleSheet.create({
        buttonContainer: {
            paddingVertical: 5,
            paddingHorizontal: 5,
            backgroundColor: disabled ? 'grey' : (buttonColor || Colors.BUTTON_COLOR_DEFAULT),
            justifyContent: 'center',
            alignItems: 'center'
        },
        title: {
            color: disabled ? '#FFF' : textColor || '#FFF',
            opacity: disabled ? 0.3 : 1,
            textAlign: 'center',
            fontFamily: FONT.FONT_FAMILY,
            fontSize: FONT.FONT_SIZE_MEDIUM,
            fontWeight: FONT.FONT_BOLD
        }

    });

    return style;
};
