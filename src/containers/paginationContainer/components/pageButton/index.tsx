import React, {useMemo} from "react";
import {Text} from "react-native";
import CustomPressable from "../../../../components/customPressable";
import {Colors} from "../../../../utils/colors";
import {getStyle} from "./styles";




interface IPageButton {
    isCurrent: boolean;
    value: string | number;
    onPressPageButton: (value: number) => void;
}


const PageButton = ({isCurrent, value, onPressPageButton}: IPageButton) => {
    const style = useMemo(() => getStyle(isCurrent), [isCurrent]);

    const handleOnpress = () => {
        onPressPageButton(Number(value));
    };

    return (
        <CustomPressable
            onHoverOpacity
            onPress={handleOnpress}
            style={style.pageButtons}
            pressedStyle={style.pageNumberPressed}>
            <Text style={style.pageText}>
                {value}
            </Text>
        </CustomPressable>
    );

};

export default PageButton;