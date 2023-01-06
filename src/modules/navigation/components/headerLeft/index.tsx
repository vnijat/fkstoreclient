import { DrawerNavigationProp } from "@react-navigation/drawer";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Pressable } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { Colors } from "../../../../utils/colors";


interface IHeaderLeft {
    navigation: DrawerNavigationProp<{}>;
}




const HeaderLeft = ({ navigation }: IHeaderLeft) => {
    return (
        <Pressable style={{ marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.goBack()}
            hitSlop={{ left: 20, top: 20, bottom: 20 }}
        >
            <Icon name='chevron-thin-left' size={25} color={Colors.DEFAULT_TEXT_COLOR} />
        </Pressable>
    );
};

export default HeaderLeft

