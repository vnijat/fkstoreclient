import { StyleSheet } from 'react-native';

export const getStyle = (textColor?: string, buttonColor?: string) => {
    const style = StyleSheet.create({
        buttonContainer: {
            paddingVertical: 5,
            paddingHorizontal: 5,
            backgroundColor: buttonColor || '#455A64',
            justifyContent: 'center',
            alignItems: 'center'
        },
        title: {
            color: textColor || '#FFF'
        }

    });

    return style;
};
