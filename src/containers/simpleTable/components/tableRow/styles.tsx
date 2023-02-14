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
        }

    });

    return style;
};
