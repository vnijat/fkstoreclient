import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/colors';
import FONT from '../../../../utils/font';

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
            marginBottom: 5,
        },
        childDrawer: {
            borderLeftWidth: 2,
            borderColor: Colors.DEFAULT_TEXT_COLOR,
            marginLeft: 2,
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
        },
        routeTitle: {
            fontSize: FONT.FONT_SIZE_SMALL,
            fontWeight: FONT.FONT_BOLD,
            fontFamily: FONT.FONT_FAMILY,
            padding: 2
        }
    });

    return style;
};
