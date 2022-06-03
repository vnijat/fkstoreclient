import React, { Ref, useState } from 'react';
import { Pressable, PressableProps, StyleProp, View, ViewStyle } from 'react-native';

interface IcustomPressable {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    pressedStyle?: StyleProp<ViewStyle>;
}



const CustomPressable = React.forwardRef(({ children, style, pressedStyle, ...rest }: PressableProps & IcustomPressable, ref: Ref<View>) => {
    const [opacity, setOpacity] = useState(1);
    const onHoverIn = () => {
        setOpacity(0.7);
    };

    const onHoverOut = () => {
        setOpacity(1);
    };

    return (
        <Pressable
            style={({ pressed }) => [pressed ? [style, pressedStyle] : style, { opacity: opacity }]}
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