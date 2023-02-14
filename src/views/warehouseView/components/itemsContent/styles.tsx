import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';
import FONT from '../../../../utils/font';


export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            backgroundColor: Colors.BACKGROUND_COLOR,
            flex: 1,
        },
        columContent: {
            height: "100%",
            minHeight: 50,
            maxHeight: 80,
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
            paddingLeft: 1

        },
        columContentText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_SMALL,
            maxWidth: 130
        },
        rowItem: {
            flexDirection: 'row',
            borderRadius: 3,
            flex: 1,
            justifyContent: 'space-evenly',
            paddingLeft: 5,
            marginVertical: 1
        },
        checkBoxContainer: {
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            width: 30,
            height: 30,
            alignSelf: 'center',
            marginRight: 1,
            paddingLeft: 11,
            zIndex: 2
        },
        contextMenuContainer: {
            width: 150,
            maxHeight: 200,
            backgroundColor: Colors.CARD_COLOR,
            padding: 2
        },
        contextMenuButton: {
            width: '100%',
            height: 30,
            flexDirection: 'row',
            backgroundColor: Colors.CARD_HEADER_COLOR,
            marginVertical: 1,
            alignItems: 'center',
            paddingHorizontal: 5
        },
        contextMenuButtonText: {
            color: Colors.DEFAULT_TEXT_COLOR
        },
        outOfStockInfo: {
            opacity: 0.3,
            backgroundColor: Colors.DEFAULT_TEXT_COLOR,
            justifyContent: 'space-around',
            flexDirection: 'row',
            alignItems: 'center'
        },
        outOfStockInfoText: {
            fontSize: FONT.FONT_SIZE_MEGA + 5,
            color: Colors.DECLINED_COLOR,
            opacity: 0.5,
            fontWeight: FONT.FONT_BOLD
        }
    });

    return style;
};
