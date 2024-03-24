import {DrawerNavigationProp} from "@react-navigation/drawer";
import {StackNavigationProp} from "@react-navigation/stack";
import React, {useCallback, useMemo} from "react";
import {Pressable} from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import {Colors} from "../../../../utils/colors";
import {getStyle} from "./styles";


interface IHeaderLeft {
    navigation: DrawerNavigationProp<{}>;
}




const HeaderLeft = ({navigation}: IHeaderLeft) => {
    const style = useMemo(() => getStyle(), []);

    const handleOnpress = useCallback(() => {
        navigation.goBack();
    }, []);

    return (
        <Pressable style={style.container}
            onPress={handleOnpress}
            hitSlop={{left: 20, top: 20, bottom: 20, right: 50}}
        >
            <Icon name='chevron-thin-left' size={25} color={Colors.DEFAULT_TEXT_COLOR} />
        </Pressable>
    );
};

export default HeaderLeft

