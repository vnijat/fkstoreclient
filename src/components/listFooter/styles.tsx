import { StyleSheet } from 'react-native';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            width: "100%",
            height: 45,
            flexDirection: 'row',
            backgroundColor: '#4DB6AC',
            alignItems: 'center',
            paddingHorizontal: 10,
            justifyContent: 'space-evenly',
        },


    });

    return style;
};
