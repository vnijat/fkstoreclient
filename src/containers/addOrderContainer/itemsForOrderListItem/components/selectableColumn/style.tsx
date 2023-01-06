import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        pickerButton: {
            width: 120,
            height: 40,
            flexDirection: 'row',
            alignItems: 'center'
        },
        pickerItem: {
            height: 25,
            margin: 2,
            backgroundColor: Colors.CARD_HEADER_COLOR,
            justifyContent: 'center'
        },
        pickerSelectedItem: {
            height: 25,
            margin: 2,
            backgroundColor: Colors.METALLIC_GOLD,
            justifyContent: 'center'
        },
        pickerItemText: {
            color: Colors.DEFAULT_TEXT_COLOR
        },
        pickerItemSelectedText: {
            color: Colors.CARD_COLOR,
            fontWeight: '700'
        },
        selectableColumnContainer: {
            zIndex: 3
        }
    });

    return style;
};
