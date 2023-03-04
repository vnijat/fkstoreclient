import { StyleSheet } from 'react-native';
import { Colors } from '../../../../utils/colors';



export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            height: 60,
            borderRadius: 3,
            backgroundColor: Colors.CARD_COLOR,
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            margin: 1,
            alignItems: 'center',
            paddingHorizontal: 10,
        },
        customColumnContainer: {
            flex: 1,
            flexDirection: 'row',
            maxWidth: 250,
            minWidth: 200,
            zIndex: 3
        }

    });

    return style;
};
