import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            height: 50,
            padding: 5,
            backgroundColor: Colors.CARD_HEADER_COLOR,
            alignItems: 'flex-end',
            paddingHorizontal: 20,
            justifyContent: 'center',
            borderBottomWidth: 2,
            borderColor: Colors.CARD_COLOR
        },

    });

    return style;
};
