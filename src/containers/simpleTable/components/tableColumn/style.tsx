import {StyleSheet} from 'react-native';

export const getStyle = (zIndex: number, columnWidth?: number) => {
    const style = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            maxWidth: columnWidth || 250,
            minWidth: 200,
            zIndex: zIndex,
            backgroundColor: 'transparent',
        }

    });

    return style;
};
