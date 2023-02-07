import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

export const getStyle = () => {
  const style = StyleSheet.create({
    container: {
      flex: 0.95,
      backgroundColor: Colors.BACKGROUND_COLOR,
      // alignItems: 'center',
      paddingTop: 60,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 20

    },
  });

  return style;
};
