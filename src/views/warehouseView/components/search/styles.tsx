import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';
import FONT from '../../../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flexGrow: 1,
            paddingVertical: 10,
            paddingHorizontal: 10,
        },
        search: {
        },
        topContainer: {
            flexShrink: 1
        },
        bottomContainer: {
            justifyContent: 'center',
            flexGrow: 1
        },
        sortBy: {
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
        },
        filterByText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontWeight: '600',
            fontSize: 11,
            textAlign: 'center',
            marginLeft: 20
        },
        clearText: {
            justifyContent: 'center',
            marginLeft: 5,
            alignItems: 'center'
        },
        pickerButtonStyle: {
            width: 90,
            height: 30,
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 3,
            paddingHorizontal: 5,
            borderRadius: 1,
            borderWidth: 1,
            borderColor: Colors.CARD_HEADER_COLOR,
            justifyContent: 'space-between',
            backgroundColor: 'transparent'
        },
        filterItemsContainer: {
            flexDirection: 'row',
            paddingHorizontal: 17,
            flexWrap: 'wrap',
        },
        filterByIconContainer: {
            marginHorizontal: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        clearButtonContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 5
        },
        bottomRightContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 0.4,
            flexWrap: 'wrap',
            paddingHorizontal: 10
        },
        bottomLeftContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 0.6,
            flexWrap: 'wrap',
            paddingHorizontal: 10
        },
        sortByPickers: {
            flexDirection: 'row',
            flexGrow: 1
        },
        infoText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_MEDIUM,
            fontWeight: FONT.FONT_BOLD,
            fontFamily: FONT.FONT_FAMILY
        }
    });

    return style;
};
