import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/colors';
import FONT from '../../../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            width: '100%',
            height: 60
        },
        checkBoxContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        checkBoxText: {
            fontSize: FONT.FONT_SIZE_MEDIUM,
            marginRight: 5,
            color: Colors.DEFAULT_TEXT_COLOR,
            fontFamily: FONT.FONT_FAMILY
        },
        chekBoxPressHandler: {
            ...StyleSheet.absoluteFillObject,
            zIndex: 2,
        },
        topContainer: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        topContainerText: {
            fontSize: FONT.FONT_SIZE_LARGE,
            fontFamily: FONT.FONT_FAMILY,
            color: Colors.METALLIC_GOLD
        },
        checkBoxesContainer: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap'
        }

    });

    return style;
};
