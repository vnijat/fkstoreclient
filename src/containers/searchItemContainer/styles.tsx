import {StyleSheet} from 'react-native';
import FONT from '../../utils/font';
import {Colors} from '../../utils/colors';


export const getStyle = () => {
    const style = StyleSheet.create({
        resultInfoContainer: {
            position: 'absolute',
            right: 15,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            top: 35,
            marginHorizontal: 20,
            height: 20
        },
        resultInfoText: {
            color: Colors.METALLIC_GOLD,
            fontSize: FONT.FONT_SIZE_SMALL
        },
        floatResultsContainer: {
            backgroundColor: Colors.CULTURED,
        },
        searchContainer: {
            paddingTop: 5
        }
    });

    return style;
};
