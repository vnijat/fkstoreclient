import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';
import FONT from '../../utils/font';


export const getStyle = () => {
    const style = StyleSheet.create({
        cardContainer: {
            width: 320,
            height: 260,
        },
        cardContent: {
            flex: 1,
            backgroundColor: Colors.CARD_COLOR,
            padding: 5,
            borderWidth: 2,
            borderRadius: 3,
            borderColor: Colors.CARD_HEADER_COLOR

        },
        cardHeader: {
            flexDirection: 'row',
            backgroundColor: Colors.CARD_HEADER_COLOR,
            height: 60,
            gap: 5,
            borderRadius: 3,
            borderTopLeftRadius: 0,
        },
        iconContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 80,
            height: 60,
            borderRadius: 3,
            backgroundColor: Colors.DEFAULT_TEXT_COLOR
        },
        infoContainer: {
            padding: 5,
            marginLeft: 5,
            gap: 5,
            alignItems: 'flex-start',
            alignSelf: 'flex-start',
        },
        infoContent: {
            flexDirection: 'row',
            justifyContent: 'center',
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
            color: Colors.METALLIC_GOLD,
            fontWeight: FONT.FONT_BOLD,
            fontFamily: FONT.FONT_FAMILY,
            maxWidth: '80%',
            zIndex: 2
        },
        clientInfo: {
            flexGrow: 1,
            gap: 2,
            padding: 3,
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
            right: 2,
            top: 10,
            zIndex: 2
        },
        contactsInfoTitleContainer: {
            paddingHorizontal: 15,
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
