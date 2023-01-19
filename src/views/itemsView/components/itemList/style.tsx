import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flex: 1
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
            backgroundColor: Colors.DEFAULT_TEXT_COLOR,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        infoActionButtonContainer: {
            flexDirection: 'row',
            width: 180,
            height: 30,
            marginRight: 10,
            justifyContent: 'space-between'
        },
        listHeaderContainer: {
            backgroundColor: Colors.CARD_HEADER_COLOR,
            justifyContent: 'center'
        },
        activityContainer: {
            paddingTop: 100
        },
        listContainer: {
            flex: 1,
            backgroundColor: Colors.BACKGROUND_COLOR
        }
    });


    return style;
};
