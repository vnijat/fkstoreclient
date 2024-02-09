import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/colors';

export const getStyle = (panelWidth: number) => {
    const style = StyleSheet.create({
        container: {
            backgroundColor: Colors.CARD_COLOR,
            minHeight: 100,
            maxHeight: 250,
            width: panelWidth,
            borderRadius: 3,
            gap: 5,
        },

    });

    return style;
};
