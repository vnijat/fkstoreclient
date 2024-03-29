import React, {FC, useMemo} from 'react';
import {PressableProps, Text} from 'react-native';
import CustomPressable from '../customPressable';
import {getStyle} from './styles';

interface PrimaryButtonProps extends PressableProps {
  title: string;
  textColor?: string;
  onPress: () => void;
  buttonColor?: string;
  width?: number;
  height?: number;
  pressedColor?: string;
  onHoverOpacity?: boolean;
  borderRadius?: number;
  disabled?: boolean;
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
  borderRadius,
  disabled,
  ...rest
}) => {
  const style = useMemo(
    () => getStyle(textColor, buttonColor, disabled),
    [buttonColor, textColor, disabled],
  );

  return (
    <CustomPressable
      onHoverOpacity={onHoverOpacity ?? true}
      onPress={onPress}
      pressedStyle={[!!pressedColor && {backgroundColor: pressedColor}]}
      style={[style.buttonContainer, {width, height, borderRadius: borderRadius || 2}]}
      disabled={disabled}
      {...rest}
    >
      <Text style={style.title}>{title}</Text>
    </CustomPressable>
  );
};
