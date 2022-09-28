import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

export const getStyle = () => {
  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.BACKGROUND_COLOR,
      width: "100%",
      alignSelf: 'flex-end',
      justifyContent: 'flex-end',
      paddingLeft: 90,
      paddingRight: 30,
      paddingBottom: 30,
    },
  });

  return style;
};
