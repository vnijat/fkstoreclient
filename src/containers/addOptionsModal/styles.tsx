import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

export const getStyle = () => {
  const style = StyleSheet.create({
    container: {
      backgroundColor: Colors.FLORAL_WHITE,
      paddingTop: 10,
    },
    buttonsContainer: {
      paddingTop: 30,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingBottom: 30,
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    inputsContainer: {
      paddingTop: 10,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: 10,
      alignItems: 'center',
      alignSelf: 'center',
      width: 500,
    },
  });

  return style;
};