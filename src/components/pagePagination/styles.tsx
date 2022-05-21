import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

export const getStyle = (textColor?: string, buttonColor?: string) => {
    const style = StyleSheet.create({
        paginationContainer: {
            flexDirection: 'row',
            height: 45,
            alignItems: 'center'
        },
        buttonsStyle: {
            height: 30,
            justifyContent: 'center',
        },
        pageText: {
            color: Colors.FLORAL_WHITE,
            textAlign: 'center',
        },
        pageButtons: {
            paddingHorizontal: 5,
            margin: 1,
            borderRadius: 2
        }
    });

    return style;
};
