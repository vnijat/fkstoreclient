import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/colors';

export const getStyle = () => {
  const style = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 5,
      borderRadius: 3,
      borderWidth: 2,
      borderColor: Colors.CARD_HEADER_COLOR,

    },
    pickerButton: {
      minWidth: 30,
      height: 25,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 3,
      paddingHorizontal: 5,
      borderRadius: 1,
      borderWidth: 1,
      borderColor: Colors.DEFAULT_TEXT_COLOR,
      // justifyContent: 'space-between',
      backgroundColor: 'transparent'
    },
    addButton: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingVertical: 3,
      backgroundColor: Colors.DEFAULT_TEXT_COLOR,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
      marginRight: 10,
    }
  });

  return style;
};
