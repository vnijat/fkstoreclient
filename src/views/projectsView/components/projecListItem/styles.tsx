import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors.BACKGROUND_COLOR,
            // alignItems: 'center'
        },
        columContent: {
            height: "100%",
            minHeight: 50,
            maxHeight: 80,
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',

        },
        columContentText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: 13,
            fontWeight: '400',
            maxWidth: 150
        },
        rowItem: {
            flexDirection: 'row',
            borderRadius: 3,
            flex: 1,
            justifyContent: 'space-evenly',
            paddingLeft: 5,
            marginVertical: 1,
            backgroundColor: Colors.CARD_COLOR
        },
        clientIconContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 5,
            width: 40,
            height: 40,
            borderRadius: 40,
            backgroundColor: Colors.CARD_HEADER_COLOR
        }
    });

    return style;
};
