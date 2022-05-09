import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

export const getStyle = (height: number, width: number, isErorr?: boolean, titleColor?: string,) => {
    const style = StyleSheet.create({
        container: {
        },
        inputTitle: {
            color: isErorr ? Colors.INFRA_RED : (titleColor || Colors.METALLIC_BLUE),
            fontWeight: '700',
            fontSize: 9,
            marginTop: 5
        },
        picker: {
            width,
            height: 100,
            padding: 5,
            marginTop: 5
        },
        pickerItem: {
            height,
            backgroundColor: Colors.OLD_GOLD
        },
        textInput: {
            width,
            height,
            padding: 5,
            marginTop: 5,
            justifyContent: 'center',
            borderRadius: 3,
            borderBottomWidth: 1,
            borderColor: Colors.LIGHT_SILVER,
            backgroundColor: Colors.OLD_GOLD
        }
    });

    return style;
};
