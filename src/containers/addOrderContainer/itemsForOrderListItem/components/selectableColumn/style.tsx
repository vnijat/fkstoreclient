import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        pickerButton: {
            width: 120,
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
        },
        pickerItem: {
            paddingLeft: 5,
            marginLeft: 5,
            minWidth: 120,
            height: 25,
            // maxHeight: 60,
            margin: 2,
            backgroundColor: Colors.CARD_COLOR,
        },
        pickerSelectedItem: {
            paddingLeft: 5,
            marginLeft: 5,
            minWidth: 120,
            height: 25,
            backgroundColor: Colors.METALLIC_GOLD,
            margin: 2,
        },
        pickerItemText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            // minWidth: 100,
            // maxWidth: 200
            width: '100%'
        },
        pickerItemSelectedText: {
            color: Colors.CARD_COLOR,
            fontWeight: '700'
        },
        selectableColumnContainer: {
            zIndex: 2,
            margin: 1,
        }
    });

    return style;
};
