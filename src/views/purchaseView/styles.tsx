import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

export const getStyle = () => {
  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.BACKGROUND_COLOR,
    },
    footerContainer: {
      flex: 0.1,
      backgroundColor: Colors.CARD_HEADER_COLOR,
      justifyContent: 'center'
    },
    searchContainer: {
      flex: 1,
      paddingLeft: 90,
      paddingRight: 15,
      paddingVertical: 30
    }
  });

  return style;
};
