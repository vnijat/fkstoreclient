import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';


export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            height: 40,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: 180,
            borderWidth: 1,
            borderColor: Colors.CARD_HEADER_COLOR,
            margin: 1,
            borderRadius: 3,
        },
        checkBoxContainer: {
            flex: 0.1,
            padding: 5
        },
        titleAndButtonContainer: {
            flex: 0.9,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: 2
        },
        buttonContainer: {
            flexDirection: 'row',
        },
        titleText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            maxWidth: 120,
            maxHeight: 30
        }

    });

    return style;
};
