import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../utils/colors';
import FONT from '../../../../../utils/font';

export const getStyle = (fullfilled?: boolean) => {
    const style = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors.BACKGROUND_COLOR,
        },
        cartItemContainer: {
            height: 80,
            margin: 2,
            backgroundColor: Colors.CARD_HEADER_COLOR,
            elevation: 1,
            marginHorizontal: 5,
            borderRadius: 3,
            padding: 5
        },
        cartItemNumber: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: 20,
            height: 20,
            padding: 2,
            backgroundColor: Colors.CARD_COLOR,
            borderRadius: 20,
            borderTopLeftRadius: 0,
            justifyContent: 'center',
            alignItems: 'center'
        },
        cartItemNumberText: {
            fontSize: FONT.FONT_SIZE_VERY_SMALL,
            textAlign: 'center',
            color: Colors.DEFAULT_TEXT_COLOR,
            fontWeight: FONT.FONT_BOLD
        },
        cartItemContentContainer: {
            flex: 1,
        },
        contentTop: {
            flex: 0.7,
            flexDirection: 'row'
        },
        contentTopLeft: {
            flex: 0.4
        },
        contentTopRight: {
            flex: 0.6,
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center'
        },
        contentBottom: {
            flex: 0.3,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        productNameContainer: {
            marginTop: 15
        },
        productNameText: {
            fontSize: FONT.FONT_SIZE_SMALL,
            color: Colors.DEFAULT_TEXT_COLOR
        },
        productUnitText: {
            marginRight: 3,
            fontSize: FONT.FONT_SIZE_VERY_SMALL,
            color: Colors.DEFAULT_TEXT_COLOR
        },
        quantityInput: {
            color: Colors.DEFAULT_TEXT_COLOR,
            backgroundColor: fullfilled ? 'transparent' : Colors.CARD_COLOR,
            height: 20,
            padding: 2,
            borderRadius: 3,
            textAlign: 'center',
            minWidth: 30,
            fontSize: FONT.FONT_SIZE_SMALL,
            fontWeight: FONT.FONT_BOLD
        },
        atStockContainer: {
            position: 'absolute',
            right: 0,
            top: 0,
            width: 80,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            borderRadius: 3,
            backgroundColor: Colors.METALLIC_GOLD

        },
        atStockText: {
            fontSize: FONT.FONT_SIZE_SMALL,
            color: Colors.CARD_COLOR,
            fontWeight: FONT.FONT_BOLD,
            textAlign: 'center',
            textAlignVertical: 'center'
        }

    });

    return style;
};
