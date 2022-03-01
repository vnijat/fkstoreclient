import { StyleSheet } from 'react-native';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            backgroundColor: '#E8F6F3',
            flex: 1
        },
        columContent: {
            height: "100%",
            minHeight: 40,
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
            flex: 1,
            flexDirection: 'row',
            padding: 3,

        },
        columContentText: {
            color: 'black',
            fontSize: 12,
        },
        rowVertical: {
            height: "100%",
            width: 1,
            backgroundColor: '#FFF',
            alignSelf: 'center',
            
        },
        rowHorizontal: {
            height: 1,
            backgroundColor: 'white',
            width: '100%',
            alignSelf: 'center'
        }
    });

    return style;
};
