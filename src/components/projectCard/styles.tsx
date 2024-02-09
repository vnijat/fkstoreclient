import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';
import FONT from '../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            width: 300,
            height: 160,
            borderWidth: 2,
            borderRadius: 5,
            borderColor: Colors.DEFAULT_TEXT_COLOR
        },
        topContainer: {
            flex: 0.7,
        },
        bottomContiner: {
            flex: 0.3,
            justifyContent: 'center',
        },
        projectCodeContainer: {
            backgroundColor: Colors.DEFAULT_TEXT_COLOR,
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center'

        },
        projectCodeText: {
            color: Colors.CARD_COLOR,
            fontFamily: FONT.FONT_FAMILY,
            fontSize: FONT.FONT_SIZE_MEGA,
            fontWeight: FONT.FONT_BOLD
        },
        projectClientContainer: {
            flex: 0.5,
            justifyContent: 'center',
        },
        selectProjectButton: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.CARD_HEADER_COLOR
        },
        selectProjectButtonText: {
            fontFamily: FONT.FONT_FAMILY,
            color: Colors.METALLIC_GOLD,
            fontSize: FONT.FONT_SIZE_LARGE,
            fontWeight: FONT.FONT_BOLD
        }

    });

    return style;
};
