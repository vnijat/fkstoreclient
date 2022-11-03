import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

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

        },
        columContentText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: 13,
            fontWeight: '400',
            maxWidth: 100
        },
        rowItem: {
            flexDirection: 'row',
            borderRadius: 3,
            flex: 1,
            justifyContent: 'space-evenly',
            // alignItems: 'center',
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
            paddingLeft:11
        }
    });

    return style;
};
