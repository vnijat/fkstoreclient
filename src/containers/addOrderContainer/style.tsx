import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';
import FONT from '../../utils/font';


export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flex: 1,
            // paddingHorizontal: 5,
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
            flex: 0.2,
            flexDirection: 'row',
            margin: 5,
        },
        orderFooterContainer: {
            flex: 0.2
        },
        orderFooterButtonContainer: {
            height: 50,
            backgroundColor: Colors.CARD_HEADER_COLOR,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
        },
        returnBackIcon: {
            height: 30,
            width: 30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.DEFAULT_TEXT_COLOR,
            borderRadius: 2
        },
        orderActionsContainer: {
            backgroundColor: Colors.DEFAULT_TEXT_COLOR,
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopWidth: 5,
            paddingHorizontal: 10,
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
            height: 600,
            flex: 1,
            gap: 5,
            justifyContent: 'center',
        },
        projectListContainer: {
            flex: 0.8,
            justifyContent: 'center',
            alignItems: 'center',
        },
        projectSelectionHeaderContainer: {
            flex: 0.1,
            backgroundColor: Colors.DEFAULT_TEXT_COLOR,
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            justifyContent: 'center',
        },
        projectSelectionBottomContainer: {
            flex: 0.1,
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
