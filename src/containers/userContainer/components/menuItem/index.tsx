import {useMemo} from "react";
import {Text, View} from "react-native";
import {getStyle} from "./styles";
import CustomPressable from "../../../../components/customPressable";
import {Colors} from "../../../../utils/colors";



interface IMenuItem {
    onPressMenuItem: () => void;
    title: string;
    icon?: JSX.Element;
}



const MenuItem = ({onPressMenuItem, title, icon}: IMenuItem) => {
    const style = useMemo(() => getStyle(), []);


    return (
        <CustomPressable
            onPress={onPressMenuItem}
            onHoverOpacity
            style={style.container}
            pressedStyle={{backgroundColor: Colors.CARD_HEADER_COLOR}}

        >
            <View style={style.menuItemContent}>
                <View style={style.menuItemIcon}>
                    {icon}
                </View>
                <Text style={style.menuItemText}>
                    {title.toUpperCase()}
                </Text>
            </View>

        </CustomPressable>
    );
};


export default MenuItem;