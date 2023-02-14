import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            backgroundColor: Colors.FLORAL_WHITE,
            flex: 1
        },
        logoText: {
            color: '#FFFF',
            fontWeight: '700',
            fontSize: 22
        },
        drawerItem: {
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            marginVertical: 5
        },
        childDrawer: {
            borderLeftWidth: 2,
            borderColor: Colors.DEFAULT_TEXT_COLOR,
            marginLeft: 2,
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
        }
    });

    return style;
};
