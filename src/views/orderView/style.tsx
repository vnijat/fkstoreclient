import { StyleSheet } from 'react-native';

export const getStyle = () => {
  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      // alignItems: 'center'
    },
  });

  return style;
};
