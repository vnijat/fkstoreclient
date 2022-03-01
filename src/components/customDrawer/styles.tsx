import { StyleSheet } from 'react-native';


export const getStyle = (width: number) => {
    const style = StyleSheet.create({
        container: {
            backgroundColor: '#E8F6F3',
            flex: 1,
            width: width * 0.05
        },
        menuButton: {
            alignSelf: 'flex-end',
            marginTop: 10,
            marginHorizontal: 10,
            width: 30,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
        },
        bottomContainer: {
            position: 'absolute',
            backgroundColor: '#4DB6AC',
            height: 40,
            width: '100%',
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopRightRadius: 3
        },
        logoText: {
            color: '#FFFF',
            fontWeight: '700',
            fontSize: 22
        },
        drawerItemLogo: {
            justifyContent: 'center',
            width: 30,
            height: 30,
            alignItems: 'center'
        },
    });

    return style;
};
