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
        }

    });

    return style;
};
