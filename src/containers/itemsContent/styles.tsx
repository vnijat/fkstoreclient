import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            backgroundColor: Colors.ALABASTER,
            flex: 1,
        },
        columContent: {
            height: "100%",
            minHeight: 40,
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
            flex: 1,
            flexDirection: 'row',
            padding: 3,

        },
        columContentText: {
            color: 'black',
            fontSize: 12,
        },
        rowItem: {
            margin: 1,
            flexDirection: 'row',
            borderRadius: 5,
            flex: 1,
            justifyContent: 'space-evenly',
        }
    });

    return style;
};
