import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        columnContaier: {
            justifyContent: 'center',
            height: 20,
            flex: 1,
            marginHorizontal: 1,
            paddingLeft: 5,
            backgroundColor: Colors.CULTURED
        },
        columnText: {
            fontSize: 10,
            color: Colors.DEFAULT_TEXT_COLOR
        }


    });

    return style;
};
