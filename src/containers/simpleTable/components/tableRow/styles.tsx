import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/colors';



export const getStyle = (rowHeight?: number, columnWidth?: number) => {
    const style = StyleSheet.create({
        container: {
            height: rowHeight || 60,
            borderRadius: 3,
            backgroundColor: Colors.CARD_COLOR,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            paddingHorizontal: 5,
        },
        customColumnContainer: {
            flex: 1,
            // flexDirection: 'row',
            maxWidth: 250,
            minWidth: columnWidth || 200,
            zIndex: 3,
        }

    });

    return style;
};
