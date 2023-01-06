import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';
import FONT from '../../utils/font';

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
        codeItem: {
            justifyContent: 'center',
            height: 20,
            margin: 1,
            backgroundColor: Colors.CARD_HEADER_COLOR
        },
        codeItemText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: FONT.FONT_SIZE_MEDIUM,
            marginLeft: 5
        },
        codeSuggestionContent: {
            width: width || 120,
            height: 130,
            backgroundColor: Colors.CARD_COLOR,
            paddingHorizontal: 5
        },
        actvityContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 1
        },
        contentScroll: { flex: 1 },
        scrollContent: { paddingVertical: 5 },
        contentTitleText: {
            fontSize: FONT.FONT_SIZE_SMALL,
            color: Colors.DEFAULT_TEXT_COLOR
        },
        codeInputContainer: { justifyContent: 'center' }
    });

    return style;
};
