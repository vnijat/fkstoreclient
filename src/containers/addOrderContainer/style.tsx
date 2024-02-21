import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';
import FONT from '../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
        },
        orderContentContainer: {
            paddingTop: 5,
            flexGrow: 0.4,
            minHeight: '40%'
        },
        orderListHeaderContainer: {
            height: 20,
            backgroundColor:
                Colors.CARD_HEADER_COLOR,
            justifyContent: 'center'
        },
        searchContainer: {
            flexGrow: 0.1
        },
        orderFooterContainer: {
            flexGrow: 0.2
        },
        orderListContainer: {
            flexGrow: 1,
            backgroundColor: Colors.CULTURED,
        },
        orderDetailContainer: {
            flexDirection: 'row',
            margin: 5,
        },
        orderFooterButtonContainer: {
            height: 50,
            backgroundColor: Colors.CARD_HEADER_COLOR,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
        },
        returnBackIcon: {
            height: 40,
            width: 100,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.DEFAULT_TEXT_COLOR,
            borderRadius: 2
        },
        orderActionsContainer: {
            backgroundColor: Colors.DEFAULT_TEXT_COLOR,
            maxHeight: 60,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopWidth: 5,
            paddingHorizontal: 10,
            paddingVertical: 2
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
        },
        projectSelectionContainer: {
            // height: 600,
            flexGrow: 1,
            gap: 5,
            justifyContent: 'center',
            padding: 10,
        },
        projectListContainer: {
            flexGrow: 0.8,
            justifyContent: 'center',
            alignItems: 'center',
        },
        projectSelectionHeaderContainer: {
            flexGrow: 0.1,
            backgroundColor: Colors.DEFAULT_TEXT_COLOR,
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            justifyContent: 'center',
        },
        projectSelectionBottomContainer: {
            flexGrow: 0.1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingHorizontal: 10,
        },
        selectedProjectContainer: {
            height: 30,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 5,
            backgroundColor: Colors.CARD_COLOR,
        },
        selectedProjectText: {
            fontSize: FONT.FONT_SIZE_MEDIUM,
            color: Colors.DEFAULT_TEXT_COLOR,
            fontWeight: FONT.FONT_BOLD,
            fontFamily: FONT.FONT_FAMILY
        }

    });

    return style;
};
