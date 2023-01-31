import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';
import FONT from '../../utils/font';

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
    headerText: {
      color: Colors.METALLIC_GOLD,
      fontWeight: FONT.FONT_BOLD,
      textAlign: 'center',
      fontSize: FONT.FONT_SIZE_MEDIUM
    },
    contentContainer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 5,
      justifyContent: 'flex-start',
    },
    tableInputContainer: {
      width: '100%',
      height: 200,
      alignSelf: 'center'
    },
    tableInputTitleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 3
    },
    tableInputTitleText: {
      color: Colors.DEFAULT_TEXT_COLOR,
      textAlign: 'center',
      fontSize: FONT.FONT_SIZE_MEDIUM
    }
  });

  return style;
};
