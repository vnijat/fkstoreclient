import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        editableColumnContainer: {
            alignItems: 'flex-start',
            width: 120,
            zIndex: 3,
            margin: 1
        }
    });

    return style;
};
