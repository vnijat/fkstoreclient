import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

export const getStyle = () => {
  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.CULTURED,
      width: "100%",
      alignSelf: 'flex-end',
      justifyContent: 'flex-end',
      paddingLeft:90
    },
  });

  return style;
};
