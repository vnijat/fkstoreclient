import React from "react";
import {View} from "react-native";
import {Colors} from "../../../../utils/colors";
import {useMemo} from "react";
import {getStyle} from "./styles";
import Icon from 'react-native-vector-icons/Entypo';
import MenuItem from "../menuItem";
import {useAppDispatch} from "../../../../modules/redux/store";
import {setIsShowMyAccountModal, setIsShowUserMenu} from "../../../../modules/redux/appStateSlicer";
import {IMenuItem} from "../../types";



interface IUserMenuContainer {
    panelWidth: number;
    menuItems: IMenuItem[];
}

const UserMenuContainer = ({panelWidth, menuItems}: IUserMenuContainer) => {
    const style = useMemo(() => getStyle(panelWidth), [panelWidth]);

    return (
        <View style={style.container}>
            {menuItems.map((item) => {
                const {icon, title, onPress} = item;
                return (
                    <MenuItem
                        key={title}
                        onPressMenuItem={onPress}
                        title={title}
                        icon={icon}
                    />
                );
            })}
        </View>
    );

};


export default UserMenuContainer;