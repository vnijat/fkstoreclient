import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';
import FONT from '../../utils/font';


export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 5
        },
        orderContentContainer: {
            paddingTop: 5,
            flexShrink: 0.5
        },
        orderListHeaderContainer: {
            height: 20,
            backgroundColor:
                Colors.CARD_HEADER_COLOR,
            justifyContent: 'center'
        },
        searchContainer: {
            flex: 0.1
        },
        orderListContainer: {
            backgroundColor: Colors.CULTURED,
            height: 300
        },
        orderDetailContainer: {
            flex: 0.2
        },
        orderFooterContainer: {
            flex: 0.1
        },
        orderFooterButtonContainer: {
            height: 50,
            backgroundColor: Colors.CARD_HEADER_COLOR,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
        },
        orderActionsContainer: {
            backgroundColor: Colors.DEFAULT_TEXT_COLOR,
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopWidth: 5
        },
        orderStatusText: {
            fontSize: FONT.FONT_SIZE_SMALL,
            marginLeft: 10
        },
        orderActionButtonsContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 220,
            marginRight: 20
        }

    });

    return style;
};
