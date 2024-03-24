import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../../utils/colors';
import FONT from '../../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors.CARD_COLOR
        },
        counterContainer: {
            position: 'absolute',
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            top: 20,
            zIndex: 3,
            left: 10
        },
        counterTextContainer: {
            position: 'absolute',
            width: 20,
            height: 20,
            borderRadius: 20,
            backgroundColor: Colors.METALLIC_GOLD,
            justifyContent: 'center',
            alignItems: 'center',
            top: -5,
            zIndex: 4,
            alignSelf: 'center',
        },
        suqareFrame: {
            height: 250,
            width: 250,
            position: 'absolute',
            alignSelf: 'center',
            zIndex: 2,
            borderColor: Colors.METALLIC_GOLD,
            borderWidth: 2,
            borderStyle: 'dashed',
            top: "25%",
            borderRadius: 25
        },
        counterText: {
            color: Colors.CARD_COLOR,
            fontSize: FONT.FONT_SIZE_SMALL,
            fontWeight: FONT.FONT_BOLD,
            textAlign: 'center',
        },
        camera: {
            flex: 1
        }
    });

    return style;
};
