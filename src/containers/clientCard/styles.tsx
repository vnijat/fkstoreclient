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
            marginLeft: 5
        },
        companyText: {
            fontSize: 12,
            color: Colors.DARK_GOLDENROD,
            fontWeight: '700'
        },
        clientInfo: {
            flex: 0.7,
            justifyContent: 'center',
            alignItems: 'center'
        },
        clientInfoText: {
            fontSize: 16,
            color: Colors.DEFAULT_TEXT_COLOR,
            fontWeight: '700'
        }
    });

    return style;
};
