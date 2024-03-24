import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../../utils/colors';
import FONT from '../../../utils/font';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors.CARD_COLOR
        },
        iconsPanelContainer: {
            height: 20,
            backgroundColor: Colors.CARD_HEADER_COLOR,
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderColor: Colors.METALLIC_GOLD,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10
        },
        iconsPanelContent: {
            flexDirection: 'row',
            marginHorizontal: 1,
            alignItems: 'center'
        },
        iconsPanelContentText: {
            fontSize: FONT.FONT_SIZE_VERY_SMALL,
            color: Colors.METALLIC_GOLD
        },
        searchPanelContainer: {
            height: 50,
            width: '100%',
            backgroundColor: Colors.DEFAULT_TEXT_COLOR,
            justifyContent: 'center'
        },
        loadingIndicator: {
            position: 'absolute',
            zIndex: 2,
            alignSelf: 'center',
            top: Dimensions.get('window').height * 0.3
        },
        emptyListContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        emptyListText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_MEDIUM,
            fontFamily: FONT.FONT_FAMILY
        }
    });

    return style;
};
