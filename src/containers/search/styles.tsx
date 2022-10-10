import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        container: {
            marginBottom: 10,
            justifyContent: 'space-between'
        },
        search: {
            paddingHorizontal: 20,
            minHeight: 50,
            maxHeight: 300,
            flexDirection: 'row',
        },
        sortBy: {
            flexDirection: 'row',
            marginBottom: 10,
            alignItems: 'center',
            flexWrap: 'wrap',
            paddingLeft: 17
        },
        filterByText: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontWeight: '600',
            fontSize: 11,
            textAlign: 'center',
            marginLeft: 20
        },
        clearText: {
            justifyContent: 'center',
            marginLeft: 5,
            alignItems: 'center'
        },
        pickerButtonStyle: {
            width: 90,
            height: 30,
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 3,
            paddingHorizontal: 5,
            borderRadius: 1,
            borderWidth: 1,
            borderColor: Colors.CARD_HEADER_COLOR,
            justifyContent: 'space-between',
            backgroundColor: 'transparent'
        },
        filterItemsContainer: {
            flexDirection: 'row',
            paddingHorizontal: 17,
            maxHeight: 300,
            minHeight: 40,
            paddingTop: 5,
            flexWrap: 'wrap'
        },
        filterByIconContainer: {
            marginHorizontal: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        clearButtonContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10
        }

    });

    return style;
};
