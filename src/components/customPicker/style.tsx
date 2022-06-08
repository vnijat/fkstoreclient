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
            margin: 3,
            padding: 5,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 1,
            borderWidth: 1,
            borderColor: Colors.OLD_GOLD,
            justifyContent: 'space-between'
        }
    });

    return style;
};
