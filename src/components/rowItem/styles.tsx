import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

export const getStyle = (color?: string, width?: number, height?: number) => {
    const style = StyleSheet.create({
        row: {
            height: height || 5,
            width: width || '100%',
            backgroundColor: color || Colors.FLORAL_WHITE,
        },
    });

    return style;
};
