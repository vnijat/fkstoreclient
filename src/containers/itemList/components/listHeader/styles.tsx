import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';

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
        },
        columnText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontWeight: '700',
            fontSize: 10
        }
    });

    return style;
};
