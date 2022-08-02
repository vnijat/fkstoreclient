import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

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
        drawerItemLogo: {
            justifyContent: 'center',
            alignItems: 'center',
            height:50,
            marginVertical: 5
        },
    });

    return style;
};
