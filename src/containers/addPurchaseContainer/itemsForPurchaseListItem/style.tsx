import { StyleSheet } from 'react-native';
import { Colors } from '../../../utils/colors';
import FONT from '../../../utils/font';


export const getStyle = () => {
    const style = StyleSheet.create({
        contextMenuContainer: {
            width: 150,
            maxHeight: 200,
            backgroundColor: Colors.CARD_COLOR,
            padding: 2
        },
        contextMenuItem: {
            height: 30,
            flexDirection: 'row',
            backgroundColor: Colors.CARD_HEADER_COLOR,
            marginVertical: 1,
            alignItems: 'center',
            paddingHorizontal: 5
        },
        contextMenuItemText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_SMALL
        },
        listItemContainer: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            height: 40,
            alignItems: 'center',
            margin: 1,
            backgroundColor: Colors.CARD_COLOR
        }

    });

    return style;
};
