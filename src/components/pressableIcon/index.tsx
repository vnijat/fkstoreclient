import React, { FC, ReactChild } from 'react';
import { Pressable } from 'react-native';


interface IPressableIcon {
    children: ReactChild;
    onPress?: () => void;
}


export const PressableIcon: FC<IPressableIcon> = ({ onPress, children }) => {

    return (
        <Pressable onPress={onPress}>
            {children}
        </Pressable>
    );

};