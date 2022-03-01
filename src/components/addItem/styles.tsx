import { StyleSheet } from 'react-native';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            backgroundColor: '#45B39D',
            height: 400,
            width: 500,
            alignSelf: 'center',
            borderRadius: 5

        }


    });

    return style;
};
