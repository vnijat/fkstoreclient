import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            backgroundColor: Colors.FLORAL_WHITE,
            marginBottom: 10,
            justifyContent: 'space-between'
        },
        search: {
            paddingHorizontal: 20,
            minHeight: 50,
            maxHeight: 300,
            flexDirection: 'row',
        },
        sortBy: {
            flexDirection: 'row',
            margin: 10,
            alignItems: 'center'
        },
        filterByText: {
            color: Colors.OLD_GOLD,
            fontWeight: '600',
            fontSize: 11,
            textAlign: 'center'
        },
        clearText: {
            color: Colors.OLD_GOLD,
            fontWeight: '700',
            ontSize: 14,
            textAlign: 'center',
            marginLeft: 10
        }

    });

    return style;
};
