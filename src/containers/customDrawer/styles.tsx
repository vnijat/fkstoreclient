import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';


export const getStyle = (width: number) => {
    const style = StyleSheet.create({
        container: {
            backgroundColor: Colors.CARD_HEADER_COLOR,
            flex: 1,
            width: width * 0.05,
        },
        bottomContainer: {
            position: 'absolute',
            height: 40,
            width: '100%',
            bottom: 15,
            justifyContent: 'center',
            alignItems: 'center',
        },
        logoText: {
            color: Colors.METALLIC_GOLD,
            fontWeight: '700',
            fontSize: 30
        },
        drawerItemLogo: {
            justifyContent: 'center',
            width: 30,
            height: 30,
            alignItems: 'center'
        },
        configButton: {
            justifyContent: 'center',
            alignItems: 'center'
        }
    });

    return style;
};
