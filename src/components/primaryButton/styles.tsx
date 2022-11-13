import { StyleSheet } from 'react-native';

export const getStyle = (textColor?: string, buttonColor?: string, disabled?: boolean) => {
    const style = StyleSheet.create({
        buttonContainer: {
            paddingVertical: 5,
            paddingHorizontal: 5,
            backgroundColor: disabled ? 'grey' : (buttonColor || '#455A64'),
            justifyContent: 'center',
            alignItems: 'center'
        },
        title: {
            color: disabled ? '#FFF' : textColor || '#FFF',
            opacity: disabled ? 0.3 : 1
        }

    });

    return style;
};
