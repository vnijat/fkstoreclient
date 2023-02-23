import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';
import FONT from '../../../../utils/font';

export const getStyle = (textColor?: string, buttonColor?: string) => {
    const style = StyleSheet.create({
        pageNumbersContainer: {
            flexDirection: 'row',
            width: 160,
            justifyContent: 'center'
        },
    });

    return style;
};
