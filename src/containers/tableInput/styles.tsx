import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

export const getStyle = () => {
    const style = StyleSheet.create({
        tableContainer: {
            height: 200
        },
        tableHeaderContainer: {
            flexDirection: 'row',
            flex: 0.1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            paddingHorizontal: 10
        },
        tableRowsContainer: {
            flex: 0.7
        },
        tableContent: {
            paddingHorizontal: 10,
            paddingBottom: 25
        },
        tableFooterContainer: {
            flex: 0.1,
            backgroundColor: Colors.CARD_HEADER_COLOR
        },
        addRowButton: {
            position: 'absolute',
            alignSelf: 'center',
            bottom: -15
        },
        removeRowButton: {
            position: 'absolute',
            alignSelf: 'center',
            right: -2,
            bottom: -10
        },
        addButton: {
            position: 'absolute',
            alignSelf: 'center',
            bottom: -25
        },
        columnTotalsContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        columnTotalName: {
            color: Colors.DEFAULT_TEXT_COLOR,
            fontSize: 10,
        },
        columnTotalValue: {
            color: Colors.METALLIC_GOLD,
            fontSize: 12,
            marginLeft: 4,
            fontWeight: '700'
        },
        tableButtonsContainer: {
            flex: 0.5,
            flexDirection: 'row',
            justifyContent: 'space-around'
        },
        columnTotalContent: {
            flexDirection: 'row',
            marginHorizontal: 3,
            alignItems: 'center',
            justifyContent: 'center'
        },
        actionButtonsContainer: {
            position: 'absolute',
            width: 300,
            height: 50,
            zIndex: 2,
            bottom: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center'
        },
        actionButton: {
            width: 30,
            height: 30,
            borderRadius: 30,
            backgroundColor: Colors.METALLIC_GOLD,
            justifyContent: 'center', alignItems: 'center'
        }
    });

    return style;
};
