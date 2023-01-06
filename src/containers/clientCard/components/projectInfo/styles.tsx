import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';
import FONT from '../../../../utils/font';


export const getStyle = () => {
    const style = StyleSheet.create({
        projectInfoTitleContainer: {
            alignSelf: 'center',
            top: -30,
            position: 'absolute',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopWidth: 1,
            borderColor: Colors.CARD_HEADER_COLOR
        },
        projectInfoButtonContiner: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5
        },
        projectInfoButtonText: {
            fontSize: FONT.FONT_SIZE_SMALL,
            color: Colors.CARD_HEADER_COLOR,
            fontWeight: FONT.FONT_BOLD
        },
        projectInfoIconButton: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 5
        },
        projectInfoContentContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 30,
            marginBottom: 10,
        },
        infoItemContainer: {
            justifyContent: 'center',
            alignItems: 'center'
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
            fontSize: FONT.FONT_SIZE_VERY_SMALL,
            color: Colors.CARD_HEADER_COLOR,
            fontWeight: FONT.FONT_BOLD
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
