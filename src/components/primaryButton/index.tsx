import React, { FC, useMemo } from 'react';
import { Text } from 'react-native';
import CustomPressable from '../customPressable';
import { getStyle } from './styles';

interface PrimaryButtonProps {
  title: string;
  textColor?: string;
  onPress: () => void;
  buttonColor?: string;
  width?: number;
  height?: number;
  pressedColor?: string;
  onHoverOpacity?: boolean;
  borderRadius?: number;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  title,
  textColor,
  onPress,
  buttonColor,
  width,
  height,
  pressedColor,
  onHoverOpacity,
  borderRadius
}) => {
  const style = useMemo(
    () => getStyle(textColor, buttonColor),
    [buttonColor, textColor],
  );

  return (
    <CustomPressable
      onHoverOpacity={onHoverOpacity}
      onPress={onPress}
      pressedStyle={[!!pressedColor && { backgroundColor: pressedColor }]}
      style={[style.buttonContainer, { width, height, borderRadius }]}>
      <Text style={style.title}>{title}</Text>
    </CustomPressable>
  );
};
