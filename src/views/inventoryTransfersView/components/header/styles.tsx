import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: Colors.CARD_COLOR,
            padding: 10,
            borderRadius: 5,
            borderColor: Colors.CARD_HEADER_COLOR,
            borderWidth: 2,

        },
        topContainer: {
            flexGrow: 1,
        },
        bottomContainer: {
            flexGrow: 1,
            paddingLeft: 5,
        }
    });

    return style;
};
