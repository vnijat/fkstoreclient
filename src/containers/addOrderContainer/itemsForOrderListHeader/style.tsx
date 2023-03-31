import { StyleSheet } from 'react-native';
import { Colors } from '../../../utils/colors';
import FONT from '../../../utils/font';



export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: 50,
        },
        columnContainer: {
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
            margin: 1,
        },
        columnText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_SMALL
        }
    });

    return style;
};
