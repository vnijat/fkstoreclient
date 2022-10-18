import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            backgroundColor: Colors.FLORAL_WHITE,
            marginBottom: 10,
            justifyContent: 'space-between'
        },

        infoTitle: {
            color: Colors.CARD_COLOR,
        },
        infoValue: {
            fontWeight: '700',
        },
        infoText: {
            fontSize: 13,
            flexDirection: 'row',
            paddingLeft: 10,
            color: Colors.METALLIC_GOLD
        },
        infoContainer: {
            height: 40,
            backgroundColor:Colors.DEFAULT_TEXT_COLOR,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    });


    return style;
};
