import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';

export const getStyle = (indent?: number) => {
    const style = StyleSheet.create({
        singleSelectItem: {
            height: 30,
            flexDirection: 'row',
            minWidth: 100,
            maxWidth: 200,
            alignItems: 'center',
            paddingHorizontal: 5,
            justifyContent: 'space-between'
        },
        counter: {
            width: 15,
            height: 15,
            borderRadius: 15,
            backgroundColor: Colors.METALLIC_GOLD,
            justifyContent: 'center',
            alignItems: 'center',
        },
        counterText: {
            color: Colors.FLORAL_WHITE,
            fontSize: 8,
            textAlign: 'center',
            fontWeight: '700',
            justifyContent: 'center',
            alignItems: 'center'
        },
        withIndent: {
            borderLeftWidth: 1,
            borderColor: Colors.METALLIC_GOLD,
            marginLeft: indent
        },
        buttonRightContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        selectedInfoContainer: {
            justifyContent: 'center'
        },
        arrowButton: { alignItems: 'center' }
    });

    return style;
};
