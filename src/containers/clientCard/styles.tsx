import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';
import FONT from '../../utils/font';


export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            backgroundColor: Colors.FLORAL_WHITE,
            flex: 1,
        },
        cardContainer: {
            width: 320,
            height: 260,
            margin: 10
        },
        cardContent: {
            flex: 1,
            backgroundColor: Colors.CARD_COLOR,
        },
        cardHeader: {
            flexDirection: 'row',
            backgroundColor: Colors.CARD_HEADER_COLOR,
            height: 60
        },
        iconContainer: {
            borderRightWidth: 1,
            borderColor: Colors.CULTURED,
            justifyContent: 'center',
            alignItems: 'center',
            width: 60,
            height: 60
        },
        infoContainer: {
            flexShrink: 1,
            alignItems: 'flex-start',
            alignSelf: 'flex-start',
            // paddingTop: 10,
            marginLeft: 10,
        },
        infoContent: {
            flexDirection: 'row',
            justifyContent: 'center',
            margin: 5,
            alignItems: 'center',
        },
        infoIcon: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        infoText: {
            fontSize: FONT.FONT_SIZE_MEDIUM,
            fontFamily: FONT.FONT_FAMILY,
            color: Colors.DEFAULT_TEXT_COLOR,
            marginLeft: 5,
        },
        companyText: {
            fontSize: FONT.FONT_SIZE_MEDIUM,
            color: Colors.DARK_GOLDENROD,
            fontWeight: FONT.FONT_BOLD,
            fontFamily: FONT.FONT_FAMILY,
            maxWidth: '80%',
            zIndex: 2
        },
        clientInfo: {
            flexGrow: 1,
            paddingLeft: 5,
            paddingTop: 5,
        },
        clientInfoText: {
            fontSize: FONT.FONT_SIZE_MEDIUM,
            fontFamily: FONT.FONT_FAMILY,
            color: Colors.DEFAULT_TEXT_COLOR,
            fontWeight: FONT.FONT_BOLD,
            maxWidth: '80%',
            maxHeight: '80%'
        },
        actionItemButton: {
            width: 100,
            height: 30,
            backgroundColor: Colors.CARD_HEADER_COLOR,
            justifyContent: 'center',
            paddingLeft: 5,
            margin: 1
        },
        actionContent: {
            flex: 1,
            backgroundColor: Colors.CARD_COLOR,
            padding: 3
        },
        actionItemText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_MEDIUM,
            fontFamily: FONT.FONT_FAMILY,
            fontWeight: FONT.FONT_BOLD,
        },
        actionButton: {
            position: 'absolute',
            right: 0,
            top: 5,
            zIndex: 2
        },
        contactsInfoTitleContainer: {
            paddingHorizontal: 15,
            borderBottomWidth: 1,
            borderColor: Colors.CARD_HEADER_COLOR
        },
        contactsInfoTitleText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_SMALL,
            fontFamily: FONT.FONT_FAMILY,
            fontWeight: FONT.FONT_BOLD
        }
    });

    return style;
};
