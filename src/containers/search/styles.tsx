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
            marginBottom: 10,
            alignItems: 'center',
            flexWrap: 'wrap'
        },
        filterByText: {
            color: Colors.OLD_GOLD,
            fontWeight: '600',
            fontSize: 11,
            textAlign: 'center',
            marginLeft: 20
        },
        clearText: {
            color: Colors.OLD_GOLD,
            fontWeight: '700',
            fontSize: 14,
            textAlign: 'center',
        }

    });

    return style;
};
