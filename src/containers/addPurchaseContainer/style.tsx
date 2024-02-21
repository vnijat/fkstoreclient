import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';
import FONT from '../../utils/font';


export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            paddingHorizontal: 5,
        },
        purchaseContentContainer: {
            paddingTop: 5,
            flexGrow: 0.4,
            minHeight: '50%',
        },
        purchaseListHeaderContainer: {
            height: 20,
            backgroundColor:
                Colors.CARD_HEADER_COLOR,
            justifyContent: 'center'
        },
        searchContainer: {
            flexGrow: 0.1
        },
        purchaseListContainer: {
            backgroundColor: Colors.CULTURED,
            flexGrow: 1
        },
        purchaseDetailContainer: {
            flexGrow: 0.2
        },
        purchaseFooterContainer: {
            flexGrow: 0.1
        },
        purchaseFooterButtonContainer: {
            height: 50,
            backgroundColor: Colors.CARD_HEADER_COLOR,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
        },
        purchaseActionsContainer: {
            backgroundColor: Colors.DEFAULT_TEXT_COLOR,
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopWidth: 5
        },
        purchaseStatusText: {
            fontSize: FONT.FONT_SIZE_SMALL,
            marginLeft: 10
        },
        purchaseActionButtonsContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 220,
            marginRight: 20
        }

    });

    return style;
};
