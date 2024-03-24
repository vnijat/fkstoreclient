import {Dimensions, StyleSheet, } from 'react-native';
import {Colors} from '../../../../../utils/colors';
import FONT from '../../../../../utils/font';

const {width} = Dimensions.get('screen');

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            backgroundColor: Colors.CARD_HEADER_COLOR,
            width: width * 0.48,
            height: 150,
            borderRadius: 3,
        },
        contentContainer: {
            flex: 1,
            paddingHorizontal: 5,
            paddingVertical: 5
        },
        bottomContainer: {
            borderTopWidth: 1,
            borderStyle: 'dashed',
            borderColor: Colors.METALLIC_GOLD,
            flexShrink: 1,
            alignItems: 'center',
            justifyContent: 'center'

        },
        rigthContainer: {
            flex: 0.3,
            justifyContent: 'space-around',
            alignItems: 'flex-end',
        },
        rightContianerItem: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        rightContainerItemText: {
            fontSize: FONT.FONT_SIZE_MEDIUM,
            fontFamily: FONT.FONT_FAMILY,
            marginRight: 5,
            color: Colors.DEFAULT_TEXT_COLOR
        },
        barcodeText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_LARGE,
            fontWeight: FONT.FONT_BOLD,
            width: '100%',
            textAlign: 'center',
            textShadowRadius: 1,
        },
        productNameText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_MEDIUM,
            width: '100%',
        },
        productInfoContainer: {
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            // borderWidth: 1,
            borderRadius: 3,
            borderColor: Colors.METALLIC_GOLD,
        },
        quantityContainer: {
            width: 90,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: Colors.METALLIC_GOLD,
        },
        quantityText: {
            width: '100%',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            color: Colors.METALLIC_GOLD,
            fontWeight: FONT.FONT_BOLD,
            textShadowRadius: 1,
        },
        unitTypeContainer: {
            flexGrow: 1,
        },
        unitTypeText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_MEDIUM,
            width: '100%',
            textAlign: 'left',
            textShadowRadius: 1,
        }
    });

    return style;
};
