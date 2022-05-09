import React, { FC, useMemo } from "react";
import { Pressable, Text } from "react-native";
import { getStyle } from "./styles";

interface PrimaryButtonProps {
    title: string;
    textColor?: string;
    onPress: () => void;
    buttonColor?: string;
    width?: number;
    height?: number;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({ title, textColor, onPress, buttonColor, width, height }) => {
    const style = useMemo(() => getStyle(textColor, buttonColor), [buttonColor, textColor]);


    return (
        < Pressable onPress={onPress} style={[style.buttonContainer, { width, height }]}>
            <Text style={style.title}>
                {title}
            </Text>
        </Pressable>

    );
};