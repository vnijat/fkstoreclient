import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';


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
            flex: 0.4,
            backgroundColor: Colors.CARD_HEADER_COLOR
        },
        iconContainer: {
            flex: 0.3,
            borderRightWidth: 1,
            borderColor: Colors.CULTURED,
            justifyContent: 'center', alignItems: 'center'
        },
        infoContainer: {
            flex: 0.6,
            alignItems: 'flex-start',
            alignSelf: 'flex-start',
            paddingTop: 10,
            marginLeft: 10
        },
        infoContent: {
            flexDirection: 'row',
            justifyContent: 'center',
            margin: 5,
            alignItems: 'center'
        },
        infoIcon: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        infoText: {
            fontSize: 12,
            color: Colors.DEFAULT_TEXT_COLOR,
            marginLeft: 5,
        },
        companyText: {
            fontSize: 12,
            color: Colors.DARK_GOLDENROD,
            fontWeight: '700',
            maxWidth: '80%',
            maxHeight: '20%',
            zIndex: 2
        },
        clientInfo: {
            flex: 0.7,
            paddingLeft: 5,
            paddingTop: 5
        },
        clientInfoText: {
            fontSize: 14,
            color: Colors.DEFAULT_TEXT_COLOR,
            fontWeight: '700',
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
            fontSize: 14
        },
        actionButton: {
            position: 'absolute',
            right: 0,
            top: 5,
            zIndex: 2
        },
        iconVipText: {
            fontSize: 10,
            fontWeight: '700',
            position: 'absolute',
            top: 22,
            color: Colors.METALLIC_GOLD
        }
    });

    return style;
};
