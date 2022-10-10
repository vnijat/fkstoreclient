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
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            flexDirection: 'row',
            padding: 3,

        },
        columContentText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: 13,
            fontWeight:'400'
        },
        rowItem: {
            margin: 1,
            flexDirection: 'row',
            borderRadius: 3,
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center'
        },
        checkBoxContainer: {
            position: 'absolute',
            left: 10,
            justifyContent: 'center',
        }
    });

    return style;
};
