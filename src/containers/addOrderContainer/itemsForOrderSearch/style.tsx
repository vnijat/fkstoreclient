import { StyleSheet } from 'react-native';
import { Colors } from '../../../utils/colors';
import FONT from '../../../utils/font';


export const getStyle = () => {
    const style = StyleSheet.create({
        resultInfoContainer: {
            position: 'absolute',
            right: 10,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            top: 30,
            marginHorizontal: 20,
            height: 20
        },
        resultInfoText: {
            color: Colors.METALLIC_GOLD,
            fontSize: FONT.FONT_SIZE_SMALL
        },
        floatResultsContainer: {
            backgroundColor: Colors.CULTURED,
            width: 680
        }
    });

    return style;
};
