import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            height: 30,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
        },
        columnContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            flexGrow: 1
        },
        columnText: {
            color: Colors.CARD_HEADER_COLOR,
            fontWeight: '700',
            fontSize: 10
        },
        button: {
            width: 90,
            height: 30,
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 3,
            paddingHorizontal: 5,
            borderRadius: 1,
            borderWidth: 1,
            borderColor: Colors.CARD_COLOR,
            justifyContent: 'space-between',
            backgroundColor: 'transparent'
        },
        counter: {
            width: 18,
            height: 18,
            borderRadius: 100,
            backgroundColor: Colors.METALLIC_GOLD,
            justifyContent: 'center',
            alignItems: 'center',
        },
        counterText: {
            color: Colors.FLORAL_WHITE,
            fontSize: 8,
            textAlign: 'center',
            fontWeight: '700',
        },
        multipleSelectItem: {
            height: 30,
            minWidth: 100,
            margin: 1,
            marginHorizontal: 5,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'transparent',
        },
    });

    return style;
};
