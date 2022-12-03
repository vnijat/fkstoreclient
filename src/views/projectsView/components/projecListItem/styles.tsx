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
            minHeight: 50,
            maxHeight: 80,
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
        },
        columContentText: {
            maxHeight: 40,
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: 12,
            fontWeight: '400',
            width: 90,
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
            width: 35,
            height: 35,
            borderRadius: 32,
            backgroundColor: Colors.CARD_HEADER_COLOR
        }
    });

    return style;
};
