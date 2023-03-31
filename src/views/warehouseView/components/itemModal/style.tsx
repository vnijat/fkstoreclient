import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';
import FONT from '../../../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flex: 1,
            height: 700,
            padding: 5
        },

        infoTitle: {
            color: Colors.CARD_COLOR,
        },
        infoValue: {
            fontWeight: '700',
        },
        infoText: {
            fontSize: 13,
            flexDirection: 'row',
            paddingLeft: 10,
            color: Colors.METALLIC_GOLD
        },
        infoContainer: {
            height: 40,
            backgroundColor: Colors.DEFAULT_TEXT_COLOR,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        contentTopContainer: {
            flex: 0.5,
            flexDirection: 'row'
        },
        contentTopLeftContainer: {
            flex: 0.6,
            borderColor: Colors.CARD_HEADER_COLOR,
            borderRightWidth: 1
        },
        contentTopRightContainer: {
            flex: 0.4,
        },
        itemBarcodeContainer: {
            flex: 1
        },
        barcodeImage: {
            width: '80%',
            height: 150,
            alignSelf: 'center'
        },
        rightContainerInfoText: {
            alignSelf: 'center',
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: 14, fontWeight: '700'
        },
        barcodeActionsButton: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingTop: 10
        },
        contentBottomContainer: {
            flex: 0.5,
            flexDirection: 'row'
        },
        contentBottomLeft: {
            flex: 0.6,
            borderColor:
                Colors.CARD_HEADER_COLOR,
            borderRightWidth: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
        },
        bottemLeftTitle: {
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 5
        },
        bottemLeftTitleText: {
            fontSize: FONT.FONT_SIZE_LARGE,
            fontFamily: FONT.FONT_FAMILY,
            color: Colors.DEFAULT_TEXT_COLOR,
            fontWeight: FONT.FONT_BOLD
        },
        bottomActionButton: {
            marginRight: 10
        },
        bottomRightContainer: {
            flex: 0.4,
            justifyContent: 'center'
        },
        bottomRightContent: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        bottomRightTitleText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_MEDIUM,
            fontWeight: FONT.FONT_BOLD,
            paddingRight: 2
        }
    });


    return style;
};
