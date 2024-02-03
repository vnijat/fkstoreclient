import {StyleSheet} from 'react-native';
import FONT from '../../../../utils/font';
import {Colors} from '../../../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            justifyContent: 'center',
            height: 40,
            backgroundColor: Colors.CARD_COLOR,

        },
        menuItemIcon: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        menuItemContent: {
            flexDirection: 'row',
            gap: 5,
            paddingHorizontal: 10,
            alignItems: 'center'
        },
        menuItemText: {
            fontSize: FONT.FONT_SIZE_SMALL,
            color: Colors.DEFAULT_TEXT_COLOR
        }

    });


    return style;
};
