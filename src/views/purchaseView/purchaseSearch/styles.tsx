import { StyleSheet } from 'react-native';
import { Colors } from '../../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flexGrow: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.CARD_COLOR,
            paddingHorizontal: 10,
            paddingVertical: 10
        },
        searchInputContainer: {
            flex: 0.4
        },
        actionButtonContainer: {
            flex: 0.6,
            paddingLeft: 10
        }
    });

    return style;
};
