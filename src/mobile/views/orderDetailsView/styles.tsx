import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/colors';
import FONT from '../../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flex: 1,
        },
        cardContainer: {
            height: 80,
            backgroundColor: Colors.CARD_HEADER_COLOR,
            margin: 3,
            marginHorizontal: 5,
            borderRadius: 3,
            elevation: 2
        },
        topContainer: {
            flex: 0.3,
        },
        contentContainer: {
            flex: 0.8,
        },
        actionsContainer: {
            flex: 0.1
        },
        dateContainer: {
            flex: 0.3,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 5,
            borderTopEndRadius: 3,
            borderTopStartRadius: 3,
            elevation: 2
        },
        dateText: {
            fontSize: FONT.FONT_SIZE_MEDIUM,
            color: Colors.DEFAULT_TEXT_COLOR,
            fontWeight: FONT.FONT_BOLD
        },
        statusIcon: {
            width: 30,
            height: 30,
            borderRadius: 20,
            borderBottomEndRadius: 3,
            backgroundColor: Colors.CARD_COLOR,
            position: 'absolute',
            bottom: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
        },
        cartItemsCount: {
            width: 30,
            height: 30,
            borderRadius: 20,
            borderBottomStartRadius: 3,
            backgroundColor: Colors.CARD_COLOR,
            position: 'absolute',
            bottom: 0,
            left: 0,
            justifyContent: 'center',
            alignItems: 'center',
        },
        countText: {
            fontSize: FONT.FONT_SIZE_MEDIUM,
            color: Colors.DEFAULT_TEXT_COLOR,
            fontWeight: FONT.FONT_BOLD
        },
        detailContainer: {
            width: '80%',
            flex: 1,
            padding: 2,
            alignItems: 'center',
            justifyContent: 'center',
        },
        detailText: {
            fontSize: FONT.FONT_SIZE_MEDIUM,
            color: Colors.DEFAULT_TEXT_COLOR
        },
        cardContentContainer: {
            flex: 0.7,
            alignItems: 'center'
        }
    });

    return style;
};
