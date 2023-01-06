import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';


export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 5
        },
        orderContentContainer: {
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
            flex: 0.3
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
        }

    });

    return style;
};
