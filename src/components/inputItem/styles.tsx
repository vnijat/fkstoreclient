import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

export const getStyle = (height: number, width: number, isErorr?: boolean, titleColor?: string, backgroundColor?: string) => {
    const style = StyleSheet.create({
        container: {
        },
        inputTitle: {
            color: isErorr ? Colors.INFRA_RED : (titleColor || Colors.METALLIC_BLUE),
            fontWeight: '700',
            fontSize: 9,
            marginTop: 5,
            paddingBottom: 3
        },
        picker: {
            width,
            height: 100,
            padding: 5,
        },
        pickerItem: {
            height,
            backgroundColor: Colors.OLD_GOLD
        },
        textInput: {
            width,
            height,
            padding: 5,
            justifyContent: 'center',
            borderRadius: 3,
            borderBottomWidth: 1,
            borderColor: Colors.CARD_COLOR,
            backgroundColor: backgroundColor || Colors.CARD_HEADER_COLOR,
        },
        magnify: {
            position: 'absolute',
            width: 20,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 3,
        },
        pickerButtonStyle: {
            width,
            height,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 1,
            borderWidth: 1,
            borderColor: Colors.CARD_COLOR,
            justifyContent: 'space-between',
        },
        pickerItemStyle: {
            height: height,
            flexDirection: 'row',
            minWidth: width,
            alignItems: 'center',
            paddingHorizontal: 5,
            backgroundColor: 'transparent',
            justifyContent: 'space-between',
            paddingRight: 20
        }
    });

    return style;
};
