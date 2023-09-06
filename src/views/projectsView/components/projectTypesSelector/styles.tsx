import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            backgroundColor: Colors.BACKGROUND_COLOR,
            flex: 0.95,
            paddingLeft: 20,
            paddingRight: 15,
            paddingVertical: 30
        },
    });

    return style;
};
