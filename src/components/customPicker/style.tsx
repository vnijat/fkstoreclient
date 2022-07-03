import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            height: 30,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            // backgroundColor: Colors.FLORAL_WHITE
        },
        columnContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            flexGrow: 1
        },
        columnText: {
            color: Colors.METALLIC_GOLD,
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
            borderColor: Colors.OLD_GOLD,
            justifyContent: 'space-between',
            backgroundColor: 'transparent'
        },
        counter: {
            position: 'absolute',
            width: 18,
            height: 18,
            borderRadius: 100,
            backgroundColor: Colors.OLD_GOLD,
            justifyContent: 'center',
            alignItems: 'center',
            top: -5,
            right: -1,
            zIndex: 2,
        },
        counterText: {
            color: Colors.FLORAL_WHITE,
            fontSize: 8,
            textAlign: 'center',
            fontWeight: '700',
        },
        multipleSelectItem: {
            height: 30,
            maxWidth: 200,
            minWidth: 100,
            margin: 1,
            marginHorizontal: 5,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'transparent',
        },
        singleSelectItem: {
            height: 30,
            flexDirection: 'row',
            minWidth: 100,
            maxWidth: 200,
            alignItems: 'center',
            paddingHorizontal: 5
        }
    });

    return style;
};
