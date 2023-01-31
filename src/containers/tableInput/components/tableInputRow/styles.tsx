import { StyleSheet } from 'react-native';

export const getStyle = () => {
    const style = StyleSheet.create({
        rowContainer: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
        }

    });

    return style;
};
