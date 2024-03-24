import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/colors';
import FONT from '../../../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors.CARD_COLOR,
            borderLeftWidth: 2,
            borderColor: Colors.METALLIC_GOLD,
            gap: 5,
            alignItems: 'center',
        },
        contentHeader: {
            flex: 0.1,
            height: 80,
            elevation: 2,
            backgroundColor: Colors.CARD_HEADER_COLOR,
            width: '100%',
            padding: 10,
            justifyContent: 'center',
            borderBottomWidth: 1,
            borderColor: Colors.METALLIC_GOLD
        },
        contentBody: {
            flex: 1,
            width: '100%',
            gap: 5
        },
        contentFooter: {
            flex: 0.1,
            width: '100%',
            padding: 10,
            justifyContent: 'center'
        },
        contentItem: {
            width: '100%',
            padding: 10,
            gap: 10,
            flexDirection: 'row',
            alignItems: 'center',
            height: 50,
            backgroundColor: Colors.CARD_HEADER_COLOR,
        },
        contentText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_MEDIUM,
            fontFamily: FONT.FONT_FAMILY,
            fontWeight: FONT.FONT_BOLD,
        },
        contentItemIcon: {
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            backgroundColor: Colors.CARD_COLOR
        }
    });

    return style;
};
