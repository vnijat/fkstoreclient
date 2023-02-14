import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

export const getStyle = () => {
  const style = StyleSheet.create({
    container: {
      flex: 0.95,
      backgroundColor: Colors.BACKGROUND_COLOR,
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 20,
    },
    listContainer: {
      flex: 0.9,
      backgroundColor: Colors.BACKGROUND_COLOR
    },
    searchContainer: {
      backgroundColor: Colors.CARD_COLOR,
      flexShrink: 0.2
    },
    footContainer: {
      flex: 0.1,
      backgroundColor: Colors.CARD_HEADER_COLOR,
      justifyContent: 'center'
    },
    listTable: { flexGrow: 1 }
  });

  return style;
};
