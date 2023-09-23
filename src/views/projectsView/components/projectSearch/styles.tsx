import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors.BACKGROUND_COLOR,
            // alignItems: 'center'
        },
        pickerButton: {
            minWidth: 30,
            height: 25,
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 3,
            paddingHorizontal: 5,
            borderRadius: 1,
            borderWidth: 1,
            borderColor: Colors.DEFAULT_TEXT_COLOR,
            justifyContent: 'space-between',
            backgroundColor: 'transparent'
        },
    });

    return style;
};
