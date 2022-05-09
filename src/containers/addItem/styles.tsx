import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            backgroundColor: Colors.FLORAL_WHITE,
            flex: 0.3,
            flexGrow: 0.3,
            paddingTop: 10
        },
        buttonsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingBottom: 30,
            lexWrap: 'wrap',
            alignItems: 'center'
        },
        inputsContainer: {
            paddingTop: 10,
            justifyContent: 'space-between',
            flexDirection: 'row',
            flex: 1,
            flexWrap: 'wrap',
            marginHorizontal: 10,
            alignContent: 'flex-start'
        }
    });

    return style;
};
