import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

export const getStyle = (width?: number, height?: number, isErorr?: boolean, isDisabled?: boolean) => {
    const style = StyleSheet.create({
        container: {
            height: 30,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingLeft: 36

        },
        textInput: {
            width,
            height,
            padding: 5,
            justifyContent: 'center',
            borderRadius: 3,
            borderBottomWidth: 1,
            borderColor: Colors.CARD_COLOR,
            backgroundColor: Colors.CARD_HEADER_COLOR,
            color: Colors.DEFAULT_TEXT_COLOR
        },
        inputTitle: {
            color: isErorr ? Colors.INFRA_RED : Colors.METALLIC_GOLD,
            fontWeight: '700',
            fontSize: 9,
            marginTop: 5,
            paddingBottom: 3
        },
    });

    return style;
};
