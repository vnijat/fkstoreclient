import React, { Ref, useState } from 'react';
import { Pressable, PressableProps, StyleProp, View, ViewStyle } from 'react-native';

interface IcustomPressable {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    pressedStyle?: StyleProp<ViewStyle>;
    onHoverOpacity?: boolean;
}



const CustomPressable = React.forwardRef(({ children, style, pressedStyle, onHoverOpacity, ...rest }: PressableProps & IcustomPressable, ref: Ref<View>) => {
    const [opacity, setOpacity] = useState(1);
    const onHoverIn = () => {
        setOpacity(0.7);
    };

    const onHoverOut = () => {
        setOpacity(1);
    };

    return (
        <Pressable
            style={({ pressed }) => [pressed ? [style, pressedStyle] : style, { opacity: onHoverOpacity ? opacity : 1 }]}
            onHoverIn={onHoverIn}
            onHoverOut={onHoverOut}
            ref={ref}
            {...rest}
        >
            {children}
        </Pressable>
    );
});


export default CustomPressable;