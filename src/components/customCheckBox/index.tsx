import {useEffect, useMemo, useState} from "react";
import {Pressable, View} from "react-native";
import Animated, {Easing, ZoomIn, ZoomInUp, useAnimatedStyle, useSharedValue, withSpring, withTiming} from "react-native-reanimated";
import Icon from "react-native-vector-icons/Entypo";
import {getStyle} from "./styles";
import {Colors} from "../../utils/colors";




interface ICustomCheckBox {
    value: boolean;
    disabled?: boolean;
    onValueChange: (value: boolean) => void;
    tintColors?: {
        true?: string;
        false?: string;
    };
    checkIconColor?: Colors | string;
}


const CustomCheckBox = ({value, disabled, onValueChange, tintColors, checkIconColor}: ICustomCheckBox) => {
    const [isCheck, setIsCheck] = useState(false);
    const style = useMemo(() => getStyle(), []);
    const iconColor = checkIconColor || Colors.CARD_COLOR;
    const checkedTintColor = tintColors?.true || Colors.METALLIC_GOLD;
    const uncheckedTintColor = tintColors?.false || Colors.CARD_COLOR;

    const handleOnpress = () => {
        !disabled && setIsCheck(!isCheck);
    };

    useEffect(() => {
        onValueChange(isCheck);
    }, [isCheck]);

    useEffect(() => {
        setIsCheck(value);
    }, [value]);

    const animatedStyle = useAnimatedStyle(() => ({
        backgroundColor: withTiming(isCheck ? checkedTintColor : uncheckedTintColor, {
            duration: 100
        }),
        opacity: withTiming(isCheck ? 1 : 0, {
            duration: 100,
            easing: Easing.cubic
        }),
        transform: [{
            scale: withTiming(isCheck ? 1 : 0.5, {
                duration: 100,
                easing: Easing.cubic
            })
        }]
    }));

    return (
        <Pressable
            style={[style.box, {backgroundColor: uncheckedTintColor, opacity: disabled ? 0.8 : 1}]}
            onTouchStart={handleOnpress}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        >
            <Animated.View
                style={[style.checkContainer, animatedStyle]}
            >
                <Icon size={20} name={'check'} color={iconColor} />
            </Animated.View>
        </Pressable>
    );

};

export default CustomCheckBox;