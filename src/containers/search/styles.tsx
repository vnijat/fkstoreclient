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
            flexWrap: 'wrap',
            paddingLeft: 17
        },
        filterByText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontWeight: '600',
            fontSize: 11,
            textAlign: 'center',
            marginLeft: 20
        },
        clearText: {
            justifyContent: 'center',
            marginLeft: 5,
            alignItems: 'center'
        }

    });

    return style;
};
