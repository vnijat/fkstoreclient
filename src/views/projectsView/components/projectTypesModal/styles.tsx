import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/colors';
import FONT from '../../../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flex: 1,
            height: 400,
            backgroundColor: Colors.CARD_COLOR,
            paddingHorizontal: 5
        },

        contextMenuContainer: {
            minWidth: 100,
            backgroundColor: Colors.CARD_COLOR,
            minHeight: 40
        },
        contextMenuItem: {
            minWidth: 100,
            backgroundColor: Colors.CARD_HEADER_COLOR,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 2,
            height: 30
        },
        contextMenuItemText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontFamily: FONT.FONT_FAMILY,
            fontSize: FONT.FONT_SIZE_MEDIUM,
        },
        resetButton: {
            position: 'absolute',
            right: 10,
            top: 10
        },
        typeCardContainer: {
            minWidth: 80,
            height: 30,
            backgroundColor: Colors.CARD_HEADER_COLOR,
            borderRadius: 3,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5,
            padding: 5
        },
        typeCardText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontFamily: FONT.FONT_FAMILY,
            fontSize: FONT.FONT_SIZE_MEDIUM
        },
        typeContentContainer: {
            flex: 0.7,
            flexDirection: 'row',
            flexWrap: 'wrap'
        },
        bottomContainer: {
            flex: 0.3,
            backgroundColor: Colors.DEFAULT_TEXT_COLOR,
            marginBottom: 5,
            justifyContent: 'center'
        },
        inputContainer: {
            flexDirection: "row",
            flexWrap: 'wrap',
            justifyContent: "center",
        },
        inputItemsContainer: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        inputButtonContainer: {
            margin: 5,
            marginLeft: 10,
            flexDirection: 'row',
            alignItems: 'flex-end'
        }

    });

    return style;
};
