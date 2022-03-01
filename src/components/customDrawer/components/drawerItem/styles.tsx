import { StyleSheet } from 'react-native';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            backgroundColor: '#E8F6F3',
            flex: 1
        },
        logoText: {
            color: '#FFFF',
            fontWeight: '700',
            fontSize: 22
        },
        drawerItemLogo: {
            justifyContent: 'center',
            alignItems: 'center',
            width: "100%"
        },
    });

    return style;
};
