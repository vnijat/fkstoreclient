import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';
import FONT from '../../../../utils/font';


export const getStyle = () => {
    const style = StyleSheet.create({
        projectInfoTitleContainer: {
            paddingHorizontal: 15,
            paddingTop: 5,
            borderBottomWidth: 1,
            borderColor: Colors.CARD_HEADER_COLOR,
        },
        projectInfoButtonContiner: {
            flexDirection: 'row',
        },
        projectInfoButtonText: {
            fontSize: FONT.FONT_SIZE_SMALL,
            color: Colors.DEFAULT_TEXT_COLOR,
            fontWeight: FONT.FONT_BOLD,
            fontFamily: FONT.FONT_FAMILY
        },
        projectInfoIconButton: {
            paddingLeft: 5
        },
        projectInfoContentContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingVertical: 5,
            backgroundColor: 'transparent'
        },
        infoItemContainer: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        infoIconContiner: {
            width: 30,
            height: 30,
            borderRadius: 40,
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center'
        },
        infoIcon: {
            width: 25,
            height: 25,
            justifyContent: 'center',
            alignItems: 'center'
        },
        infoContentContainer: {
            alignItems: 'center',
            paddingTop: 1
        },
        infoTitleText: {
            fontSize: FONT.FONT_SIZE_SMALL,
            color: Colors.DEFAULT_TEXT_COLOR,
            fontWeight: FONT.FONT_BOLD,
            fontFamily: FONT.FONT_FAMILY,

        },
        infoValueText: {
            fontSize: FONT.FONT_SIZE_MEDIUM,
            color: Colors.METALLIC_GOLD,
            fontWeight: FONT.FONT_BOLD,
            marginBottom: 5
        }
    });

    return style;
};
