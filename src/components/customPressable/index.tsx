import React, {Ref, useState} from 'react';
import {Platform, Pressable, PressableProps, StyleProp, View, ViewStyle} from 'react-native';
import {Colors} from '../../utils/colors';
import HELP from '../../services/helpers';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';

interface IcustomPressable extends PressableProps {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    pressedStyle?: StyleProp<ViewStyle>;
    onHoverOpacity?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    vibrate?: boolean;
}



const CustomPressable = React.forwardRef(({children, style, pressedStyle, onHoverOpacity, onMouseEnter, onMouseLeave, vibrate, ...rest}: IcustomPressable, ref: Ref<View>) => {
    const [opacity, setOpacity] = useState(1);
    const onHoverIn = () => {
        setOpacity(0.7);
        onMouseEnter && onMouseEnter();
    };

    const onHoverOut = () => {
        setOpacity(1);
        onMouseLeave && onMouseLeave();
    };

    const handleTouchStart = () => {
        if (vibrate && Platform.OS !== 'windows') {
            RNReactNativeHapticFeedback.trigger('impactLight', {enableVibrateFallback: true});
        }
    };

    return (
        <Pressable
            style={({pressed}) => [pressed ? [style, pressedStyle] : style, {opacity: onHoverOpacity ? opacity : 1}]}
            onHoverIn={onHoverIn}
            onHoverOut={onHoverOut}
            ref={ref}
            onTouchStart={handleTouchStart}
            android_ripple={{color: Colors.METALLIC_GOLD}}
            {...rest}
        >
            {children}
        </Pressable>
    );
});


export default CustomPressable;